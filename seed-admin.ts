import { auth } from "./lib/auth"; // Tu config de Better Auth

async function main() {
    console.log("🚀 Iniciando creación del administrador...");

    try {
        const admin = await auth.api.createUser({
            body: {
                email: "admin@ejemplo.com",
                password: "testuser", 
                name: "Admin FabSoft",
                role: "admin",
            },
        });

        console.log("✅ Admin creado con éxito:", admin.user.email);
    } catch (error) {
        console.error("❌ Error al crear admin:", error);
    }
}

main();