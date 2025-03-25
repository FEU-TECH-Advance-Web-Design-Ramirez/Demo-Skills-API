import { NextResponse } from 'next/server'
import { PrismaClient as PostgresqlClient } from "@/../prisma/generated/postgresql2";
import { hash } from 'bcryptjs'

const prisma = new PostgresqlClient()

// Create a new user
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingUser = await prisma.userSocialButterfly.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await prisma.userSocialButterfly.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// List all users
export async function GET() {
  try {
    const users = await prisma.userSocialButterfly.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    return NextResponse.json(users, { status: 200 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
