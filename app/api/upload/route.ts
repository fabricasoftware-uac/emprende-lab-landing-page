import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const _bytes = await file.arrayBuffer();
    const buffer = Buffer.from(_bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = uniqueSuffix + "-" + file.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
    
    const params = {
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: fileName,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Mapeamos a la URL pública de R2 dev setup, quita el '/' final si lo tiene el usuario por error
    let publicUrlBase = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
    if (publicUrlBase && !/^https?:\/\//i.test(publicUrlBase)) {
      publicUrlBase = `https://${publicUrlBase}`;
    }
    const fileUrl = `${publicUrlBase}/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Error interno al subir archivo a R2: " + (error?.message || "") }, { status: 500 });
  }
}

