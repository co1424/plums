import prisma from "@/app/data";
import { NextResponse, NextRequest } from "next/server";


export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json()
        console.log("here's the request content after req.json() in api/image/DELETE", body)
        const { id } = body;

            const result = await prisma.image.delete({
              where:{
                id: id
              }
              });
        console.log("image/DELETE response", NextResponse.json({ result }))
        return NextResponse.json({ result })
    } catch (err) {
     return NextResponse.json({message: "DELETE Error", err}, {status: 500})   
    }
}