import prisma from "@/app/data";
import { Prisma, Tag } from "@prisma/client";
import { useSearchParams } from 'next/navigation'
import { NextResponse, NextRequest } from "next/server";
import React from 'react'
import { useParams } from 'next/navigation'
import { error } from "console";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const { name, image, description, userInfo: user} = body;

        const upsertUser = await prisma.user.upsert({
            where: { email: user.email },
            update: { email: user.email, name: user.given_name },
            create: { email: user.email, name: user.given_name },
        })
        console.log("answer from upsert", NextResponse.json({upsertUser}))
        const result = await prisma.tag.create({ 
            data: {
                name,
                image,
                description,
                author: {
                    connect: {
                        email: user.email
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

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const param =  searchParams?.get("email");
        if (!param) {
            return NextResponse.json({ message: "GET Error", error: "Email parameter is missing" }, { status: 400 });
        }
        
        const user = await prisma.user.findFirst({
            where: {
                
                    email: param
                },
            include: {
                tags:true
            }
            })
            
        console.log("este es el user", user)
        
        // const tags = await prisma.tag.findMany({
        //     where: {
        //         author: {
        //             id: '655bdd221f7696eacd122822',
        //         },
        //     },
        // });
        // console.log('estas son las tags', tags)
        return NextResponse.json(user?.tags);
    } catch (err) {
        return NextResponse.json({ message: "GET Error", error: error || "Unknown error" }, { status: 500 });
    }
};


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