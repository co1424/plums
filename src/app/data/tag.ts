import { Tag } from "@prisma/client";
import prisma from ".";

export async function getTags() {
    try{
        const tags = await prisma.tag.findMany()
        return { tags }
    }catch(error){
        console.log("error at data/index/getTags function: ",error)
        return error
    }
}

export async function createTag(tag: Tag) {
    try{
        const tagFromDB = await prisma.tag.create({ data: tag })
        return { tag: tagFromDB }
    }catch(error){
        console.log("error at data/index/createTag function: ",error)
        return error
    }
}

export async function getTagById(id: string) {
    try{
        const tag = await prisma.tag.findUnique({ where: { id } })
        return { tag }
    }catch(error){
        console.log("error at data/index/getTagById function: ",error)
        return error
    }
}