import authOptions from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

    const url = new URL(req.nextUrl);
    const streamId = url.searchParams.get("streamId");
    const spaceId = url.searchParams.get("spaceId");

    console.log(streamId, spaceId);

    if (!spaceId) {
      NextResponse.json(
        {
          message: "Space  Id required",
        },
        {
          status: 404,
        }
      );
    }

    if (!streamId) {
      return NextResponse.json(
        {
          message: "Stream Id required",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.stream.delete({
      where: {
        id: streamId,
        spaceId: spaceId ?? "",
      },
    });

    return NextResponse.json(
      {
        message: "Song removed successfully",
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
