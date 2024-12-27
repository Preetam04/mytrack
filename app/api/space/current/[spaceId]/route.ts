import authOptions from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session?.user.id) {
    //   return NextResponse.json(
    //     {
    //       message: "User not logged in",
    //     },
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    const { spaceId } = await params;
    console.log(spaceId);

    if (!spaceId) {
      return NextResponse.json(
        {
          message: "Space Id is required",
        },
        {
          status: 404,
        }
      );
    }

    const spaceExists = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!spaceExists) {
      return NextResponse.json(
        {
          message: "Space not found",
        },
        {
          status: 403,
        }
      );
    }

    const currentStream = await prisma.currentStream.findUnique({
      where: {
        spaceId: spaceId,
      },
    });

    return NextResponse.json(
      {
        message: "Current Stream fetched successfully",
        currentStream,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
