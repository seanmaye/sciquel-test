import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
    try{
        //get the 50 comments
        const nextComments = await prisma.comment.findMany({
            take: 50,
        });
        return NextResponse.json(nextComments, { status: 200 });
    }catch(error){
        console.error('Error getting commments', error);
        return NextResponse.json({error: 'Internal server error'}, {status:500});
    }
    
}

export async function POST(req: NextRequest){
   try{

    //get name email and comment from request 
    const{name,email, comment} =  await req.json();
    
    //check if any fields are missing
    if(!name || !email || !comment){
        return NextResponse.json({ error: 'Name, email, and comment are required' }, { status: 400 });
    }
   
    //create new comment
   const newComment = await prisma.comment.create({
    data: {
        name,
        email,
        comment,
    },
});
    //send request with new comment
    return NextResponse.json(newComment, {status: 200})
   }catch(error){
    //return error
    console.error('Error cannot create coment: ',error);
    return NextResponse.json({error: 'Server Error'}, {status:500})
   }
    //return NextResponse.json({ test: "success", }, { status: 200 })
}