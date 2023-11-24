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

            let tagInfoFormat;
            if(selectedTags.length == 1){
              tagInfoFormat = {id: selectedTags[0]}
            } else if(selectedTags.length > 1){
              tagInfoFormat = []
              selectedTags.forEach((e:string) => {
                tagInfoFormat.push({id:e}) ;
              });
            } else if (selectedTags.length == 0){
              tagInfoFormat = {id: ""}
            }
            const result = await prisma.note.create({
                data: {
                  title,
                  content,
                  tags:   {connect: tagInfoFormat},
                  images: { create: [{ image: image, description: "img description" }] },
                  files: { create: [{ file: file, description: "file description" }] },
                  urls: { create: [{ url: url, description: "url description" }] },
                  authorId: "655bdd221f7696eacd122822", 
                },
              });
        
        return NextResponse.json({ result })
    } catch (err) {
     return NextResponse.json({message: "POST Error", err}, {status: 500})   
    }
}