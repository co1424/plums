import prisma from "@/app/data";
import { Tag } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import React from 'react'


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        console.log("here's the request content after req.json() in api/note", body)
        const { 
            title,
            url,
            image,
            file,
            content,
            selectedTags} = body;

            const result = await prisma.note.create({
                data: {
                  title,
                  content,
                  tagIds: selectedTags,
                  images: { create: [{ image: image, description: "img description" }] }, // Assuming 'url' is the field for the image URL
                  files: { create: [{ file: file, description: "file description" }] },
                  urls: { create: [{ url: url, description: "url description" }] },
                  authorId: "655bdd221f7696eacd122822", // Include the authorId
                },
              });
        // console.log("this is the result content", result)
        return NextResponse.json({ result })
    } catch (err) {
     return NextResponse.json({message: "POST Error", err}, {status: 500})   
    }
}