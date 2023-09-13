import prisma from '@/prisma'
import { NextResponse } from 'next/server'

export async function main() {
  try {
    await prisma.$connect()
  } catch (err) {
    return Error('Database Connection Unsuccessull')
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  // console.log('GET /api/blog')
  try {
    // connect to db with the main function
    await main()
    const posts = await prisma.post.findMany()
    return NextResponse.json({ message: 'Success', posts }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  // console.log('POST /api/blog')
  try {
    // destructuring the data from request.body
    const { title, description } = await req.json()
    // connect to db with the main function
    await main()
   // insert data to the database
    const post = await prisma.post.create({ data: { description, title } })
    return NextResponse.json({ message: 'Success', post }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
