import { NextResponse } from 'next/server'
import { main } from '../route'
import prisma from '@/prisma'

/* first we are getting the ID then we are connecting to the database then we are fetching the post by id and if we don't have the post we are sending the
response message "Not Found" and if we have the post then we are sending the response message that this time we found a post with a message of "Success" */

// Creating a Dynamic API Route Handler With GET Request
export const GET = async (req: Request, res: NextResponse) => {
  try {
    // split the url to get the id from the second value in the array
    const id = req.url.split('/blog/')[1]
    // connect to db with the main function
    await main()
    // find the post with the id
    const post = await prisma.post.findFirst({ where: { id } })
    // validate if the post is found or not found
    if (!post) return NextResponse.json({ message: 'Not Found' }, { status: 404 })
    return NextResponse.json({ message: 'Success', post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// Creating A PUT Request to update Blog
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    // split the url to get the id from the second value in the array
    const id = req.url.split('/blog/')[1]
    // destructuring the data from request.body
    const { title, description } = await req.json()
    // connect to db with the main function
    await main()
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    })
    return NextResponse.json({ message: 'Success', post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (req: Request, res: NextResponse) => {}
