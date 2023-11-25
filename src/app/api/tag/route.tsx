import prisma from "@/app/data";
import { Tag } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import React from 'react'

// id       String    @id @default(auto()) @map("_id") @db.ObjectId
// name    String
// description     String?
// image     String?
// author   User      @relation(fields: [authorId], references: [id])
// authorId String    @db.ObjectId
// noteIDs String[]   @db.ObjectId
// notes  Note[] @relation(fields: [noteIDs], references: [id])

interface TagInput {
    name: string;
    description: string;
    image: string;
}

// ATTEMPT 1 
// export default async function createTag(request: TagInput) {
//     try{
//         console.log("this is the request object",request)
//         const result = await prisma.tag.create({ 
//             data: {
//                 ...request,
//                 author: {
//                     create: {
//                         email: 'peter@parker.com',
//                         name: 'Peter',
//                     }
//                 }
//             }
//         })
//         return NextResponse.json({ result })
//     }catch(error){
//         console.log("error at app/api/route/createTag function: ",error)
//         return error
//     }
// }


// ATTEMPT 2 (WITH BARD) 
// export default async function createTag(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     try {
//       const { name, description, image } = req.body as TagInput;
//       const result = await prisma.tag.create({
//         data: {
//           name,
//           description,
//           image,
//           author: {
//             create: {
//               email: "peter@parker.com",
//               name: "Peter",
//             },
//           },
//         },
//       });
//       return res.status(201).json({ message: "Tag created successfully", result });
//     } catch (error) {
//       console.error("Error creating tag:", error);
//       return res.status(500).json({ message: "Failed to create tag" });
//     }
//   }
  


// ATTEMPT 3 (WITH LIGHT CODE YOUTUBER)

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        console.log("here's the request content after req.json() in api/tag", body)
        const { name, image, description} = body;
        // console.log("and here's the tag name in api/tag", name)
        const result = await prisma.tag.create({ 
            data: {
                name,
                image,
                description,
                author: {
                    connect: {
                        id:"655bdd221f7696eacd122822"
                    }
                }
            }
        })
        // console.log("this is the result content", result)
        return NextResponse.json({ result })
    } catch (err) {
     return NextResponse.json({message: "POST Error", err}, {status: 500})   
    }
}

export const GET = async () => {
    try {
        const tags = await prisma.tag.findMany()

        return NextResponse.json(tags)
    } catch (err) {
        return NextResponse.json({message: "GET Error", err}, {status: 500})
    }
}