import { Note, Tag } from "@prisma/client";
import prisma from ".";

export async function getNotes() {
    try{
        const notes = await prisma.note.findMany()
        return { notes }
    }catch(error){
        console.log("error at data/index/getNotes function: ",error)
        return error
    }
}

export async function getNotesByTag(tag: String) {
    try{
        const notes = await prisma.note.findMany({
            include: {
                tags: {
                    name: tag
                }
            }
        })
        return { notes }
    }catch(error){
        console.log("error at data/index/getNotes function: ",error)
        return error
    }
}

export async function createNote(note: Note) {
    try{
        const noteFromDB = await prisma.note.create({ data: note })
        return { note: noteFromDB }
    }catch(error){
        console.log("error at data/index/createNote function: ",error)
        return error
    }
}

export async function getNoteById(id:string) {
    try{
        const note = await prisma.note.findUnique({ where: { id } })
        return { note }
    }catch(error){
        console.log("error at data/index/getNoteById function: ",error)
        return error
    }
}