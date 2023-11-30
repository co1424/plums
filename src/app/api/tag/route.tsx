import prisma from "@/app/data";
import { Tag } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import React from 'react'


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { name, image, description} = body;

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

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { id } = body;

        const result = await prisma.tag.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ result })
    } catch (err) {
        return NextResponse.json({message: "DELETE Error for deleting a tag", err}, {status: 500})
    }
}