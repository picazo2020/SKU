import { NextResponse } from "next/server";
import { sortPdfPairsBySku } from "@/lib/pdfSorter";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No se subió ningún archivo" }, { status: 400 });
    }

    const buffers = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      // 🎯 AJUSTE CLAVE: Guardamos un objeto con el nombre del archivo y su buffer binario
      buffers.push({ 
        name: file.name, 
        buffer: Buffer.from(arrayBuffer) 
      });
    }

    // Ejecuta el motor mezclador puro de SKUs pasándole los objetos estructurados
    const sortedPdfBytes = await sortPdfPairsBySku(buffers);

    return new NextResponse(sortedPdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="guias-multiples-ordenadas.pdf"',
      },
    });
  } catch (err) {
    console.error("Error en la API:", err);
    return NextResponse.json({ error: "Error interno procesando PDF" }, { status: 500 });
  }
}
