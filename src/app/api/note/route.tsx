import prisma from "@/app/data";
import { Tag } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import React from 'react'


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        console.log("here's the request content after req.json() in api/note/POST", body)
        const { 
          title,
          url,
          urlNote,
          image,
          imageNote,
          file,
          fileNote,
          content,
          selectedTags } = body;
            
            //handle if tag is empty
            let tagInfoFormat;
            if(selectedTags.length == 1){tagInfoFormat = {id: selectedTags[0]}} 
            else if(selectedTags.length > 1){
              tagInfoFormat = []
              selectedTags.forEach((e:string) => {
                tagInfoFormat.push({id:e}) ;
              });}
            // handle if images is empty
            let imgInfoFormat;
            if(image){imgInfoFormat = [{ image: image, description: imageNote }]}
            //handle if files is empty
            let fileInfoFormat;
            if(file){fileInfoFormat = [{ file: file, description: fileNote }]}
            //handle if urls is empty
            let urlInfoFormat;
            if(url){urlInfoFormat = [{ url: url, description: urlNote }]}

            const result = await prisma.note.create({
                data: {
                  title,
                  content,
                  tags:   {connect: tagInfoFormat},
                  images: { create: imgInfoFormat },
                  files: { create: fileInfoFormat },
                  urls: { create: urlInfoFormat },
                  authorId: "655bdd221f7696eacd122822", 
                },
              });
        
        return NextResponse.json({ result })
    } catch (err) {
     return NextResponse.json({message: "POST Error", err}, {status: 500})   
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json()
        console.log("here's the request content after req.json() in api/note/DELETE", body)
        const { id } = body;

            const result = await prisma.note.delete({
              where:{
                id: id
              }
              });
        console.log("note/DELETE response", NextResponse.json({ result }))
        return NextResponse.json({ result })
    } catch (err) {
     return NextResponse.json({message: "POST Error", err}, {status: 500})   
    }
}



interface NoteProps {
  params: {
    tag: string
    tagId: string
  }
}

export const GET = async (req: NextRequest) => {
  try {
    // Convert the URL string to a URL object
    const url = new URL(req.url);
    
    // Extract the tagId from the search parameters
    const tagId = url.searchParams.get('tagId');
    

    const result = await prisma.note.findMany({
      where: {
        tagIds: {
          has: tagId,
        },
      },
      include: {
        images: true,
        files: true,
        urls: true,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error fetching notes by tag api/note/route', error);
    return NextResponse.json({ message: 'Error fetching notes by tag', error }, { status: 500 });
  }
};



