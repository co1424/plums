import { User } from "@prisma/client";
import prisma from ".";

export async function getUsers() {
    try{
        const users = await prisma.user.findMany()
        return { users }
    }catch(error){
        console.log("error at data/index/getUsers function: ",error)
        return error
    }
}

export async function createUser(user: User) {
    try{
        const userFromDB = await prisma.user.create({ data: user })
        return { user: userFromDB }
    }catch(error){
        console.log("error at data/index/createUser function: ",error)
        return error
    }
}

export async function getUserById(id: string) {
    try{
        const user = await prisma.user.findUnique({ where: { id } })
        return { user }
    }catch(error){
        console.log("error at data/index/getUserById function: ",error)
        return error
    }
}