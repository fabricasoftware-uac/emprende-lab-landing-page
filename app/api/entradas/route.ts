import { db } from "@/db";
import { entradas } from "@/db/schema";
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
        const coleccionSlug = searchParams.get("coleccionSlug");

        if (!proyectoId || !coleccionSlug) {
            return NextResponse.json({ error: "Missing proyectoId or coleccionSlug" }, { status: 400 });
        }

        const list = await db.select()
            .from(entradas)
            .where(
                and(
                    eq(entradas.proyectoId, proyectoId),
                    eq(entradas.coleccionSlug, coleccionSlug)
                )
            )
            .orderBy(entradas.creadoEn);

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
        const { id, proyectoId, coleccionSlug, contenido } = body;

        if (!proyectoId || !coleccionSlug || !contenido) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (id) {
            // Update
            const res = await db.update(entradas)
                .set({ contenido, actualizadoEn: new Date() })
                .where(eq(entradas.id, id))
                .returning();
            return NextResponse.json({ data: res[0] });
        } else {
            // Create
            const res = await db.insert(entradas).values({
                id: crypto.randomUUID(),
                proyectoId,
                coleccionSlug,
                contenido,
            }).returning();
            return NextResponse.json({ data: res[0] });
        }
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

        await db.delete(entradas).where(eq(entradas.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
