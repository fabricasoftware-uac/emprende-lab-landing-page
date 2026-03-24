import { db } from "@/db";
import { proyectos, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, isNull, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || (session.user.role !== "admin" && session.user.role !== "user")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        let query = db
            .select({
                id: proyectos.id,
                nombre: proyectos.nombre,
                descripcion: proyectos.descripcion,
                slug: proyectos.slug,
                template: proyectos.template,
                estado: proyectos.estado,
                createdAt: proyectos.createdAt,
                userId: proyectos.user_id,
                userName: user.name,
                userEmail: user.email,
            })
            .from(proyectos)
            .leftJoin(user, eq(proyectos.user_id, user.id))
            .$dynamic();
            
        if (session.user.role !== "admin") {
            query = query.where(eq(proyectos.user_id, session.user.id));
        }

        const list = await query.orderBy(proyectos.createdAt);

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
        const { nombre, descripcion, slug, template, userId } = body;

        if (!nombre || !descripcion || !slug || !userId) {
            return NextResponse.json({ error: "Nombre, descripción, slug y dueño son obligatorios" }, { status: 400 });
        }

        const res = await db.insert(proyectos).values({
            id: crypto.randomUUID(),
            nombre,
            descripcion,
            slug,
            user_id: userId,
            template: template || "default",
            estado: "active",
        }).returning();

        return NextResponse.json({ data: res[0] });
    } catch (error: any) {
        console.error(error);
        if (error.code === '23505') {
            return NextResponse.json({ error: "El slug ya está en uso" }, { status: 400 });
        }
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
        const { id, nombre, descripcion, slug, template, userId } = body;

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        const res = await db.update(proyectos)
            .set({
                nombre,
                descripcion,
                slug,
                user_id: userId,
                template,
                updatedAt: new Date(),
            })
            .where(eq(proyectos.id, id))
            .returning();

        return NextResponse.json({ data: res[0] });
    } catch (error: any) {
        console.error(error);
        if (error.code === '23505') {
            return NextResponse.json({ error: "El slug ya está en uso" }, { status: 400 });
        }
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

        await db.delete(proyectos).where(eq(proyectos.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
