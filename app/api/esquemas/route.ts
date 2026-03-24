import { db } from "@/db";
import { esquemas } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const proyectoId = searchParams.get("proyectoId");

        let query = db.select().from(esquemas).$dynamic();
        
        const conditions = [];
        if (proyectoId) {
            conditions.push(eq(esquemas.proyectoId, proyectoId));
        }
        
        if (session.user.role !== "admin") {
            conditions.push(eq(esquemas.activo, true));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        const list = await query.orderBy(esquemas.creadoEn);
        return NextResponse.json({ data: list });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { proyectoId, nombre, slug, campos, esRegistroUnico } = body;

        if (!proyectoId || !nombre || !slug || !campos) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const res = await db.insert(esquemas).values({
            id: crypto.randomUUID(),
            proyectoId,
            nombre,
            slug,
            campos,
            esRegistroUnico: esRegistroUnico || false,
            activo: true,
        }).returning();

        return NextResponse.json({ data: res[0] });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, nombre, slug, campos, esRegistroUnico, activo } = body;

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const res = await db.update(esquemas)
            .set({
                ...(nombre !== undefined && { nombre }),
                ...(slug !== undefined && { slug }),
                ...(campos !== undefined && { campos }),
                ...(esRegistroUnico !== undefined && { esRegistroUnico }),
                ...(activo !== undefined && { activo }),
            })
            .where(eq(esquemas.id, id))
            .returning();

        return NextResponse.json({ data: res[0] });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await db.delete(esquemas).where(eq(esquemas.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
