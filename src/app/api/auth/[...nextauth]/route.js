import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/libs/db';
import bcrypt from 'bcrypt';


const authOpcions = {
    providers: [
        CredentialsProvider({
            name: "Credencials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: " Username" },
                password: { label: "Password", type: "password", placeholder: "*******" }
            },
            async authorize(credentials, req) {
                const userfound = await prisma.user.findUnique({
                    where: {
                        username: credentials.username

                    }
                })
                if (!userfound) {
                    throw new Error('No user found');
                }
                console.log(userfound)

                const matchPassword = await bcrypt.compare(credentials.password, userfound.password)
                if (!matchPassword) {
                    throw new Error('Wrong password');
                }
                return {
                    id: userfound.id,
                    name: userfound.username,
                    email: userfound.email

                }
            }
        })

    ],
    pages: {
        signIn: '/auth/Login'
    }
}

const handler = NextAuth(authOpcions);
export { handler as GET, handler as POST }