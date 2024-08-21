import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from '@/libs/db';



export async function POST(request) {
   try {

    const data = await request.json();

    console.log(data);
    // Verificar Username
    const Userfound_user  = await prisma.user.findUnique({
        where: {
            username : data.username
        }
    })
    if (Userfound_user){
        return NextResponse.json({message: 'El usuario ya existe'},
            {
                status: 400 }
        );
    }

    // Verificar Email
    const Userfound_email  = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (Userfound_email){
        return NextResponse.json({message: 'El correo ya esta en uso'},
            {
                status: 400 }
        );
    }

    // Crear usuario
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = await prisma.user.create({ 
        data:{
            username: data.username,
            email: data.email,
            password: hashedPassword,
            is_superuser: false
        }
    });

    const {password: _,...user} = newUser;

    return NextResponse.json(newUser);

    
   } catch (error) {
    return NextResponse.json({
        message: 'Hubo un error',
        error: error.message
    },
    {
        status: 500
    })
   }
}