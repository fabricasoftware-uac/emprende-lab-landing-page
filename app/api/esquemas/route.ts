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

        let query = db.select().from(esquemas);
        if (proyectoId) {
            query = query.where(eq(esquemas.proyectoId, proyectoId)) as any;
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
        }).returning();

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
