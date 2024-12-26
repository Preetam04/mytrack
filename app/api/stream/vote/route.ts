import authOptions from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "You must be logged in to vote",
      },
      {
        status: 401,
      }
    );
  }

  const { streamId } = await req.json();

  if (!streamId) {
    return NextResponse.json(
      {
        message: "Stream Id not provided",
      },
      {
        status: 400,
      }
    );
  }

  const voted = await prisma.upvote.findFirst({
    where: {
      userId: session.user.id,
      streamId: streamId,
    },
  });

  if (!voted) {
    await prisma.upvote.create({
      data: { userId: session.user.id, streamId: streamId },
    });

    return NextResponse.json(
      {
        message: "Stream upvoted",
      },
      {
        status: 200,
      }
    );
  }

  await prisma.upvote.delete({
    where: {
      id: voted.id,
    },
  });

  return NextResponse.json(
    {
      message: "Stream down voted",
    },
    {
      status: 200,
    }
  );
}
