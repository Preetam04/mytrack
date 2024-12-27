import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const { spaceId, streamId } = await req.json();

    if (!spaceId || !streamId) {
      return NextResponse.json(
        {
          message: "StreamId and SpaceId required",
        },
        {
          status: 400,
        }
      );
    }

    const spaceExists = await prisma.space.findFirst({
      where: {
        id: spaceId,
      },
    });

    if (!spaceExists) {
      return NextResponse.json(
        {
          message: "Space Not Found",
        },
        {
          status: 403,
        }
      );
    }

    const streamExists = await prisma.stream.findFirst({
      where: {
        id: streamId,
      },
    });

    if (!streamExists) {
      return NextResponse.json(
        {
          message: "Stream Not Found",
        },
        {
          status: 403,
        }
      );
    }

    const currentStreamExists = await prisma.currentStream.findUnique({
      where: {
        spaceId: spaceId,
      },
    });

    if (currentStreamExists) {
      const updateCurrentStream = await prisma.currentStream.update({
        where: {
          spaceId: currentStreamExists.id,
        },
        data: {
          streamId: streamExists.id,
        },
      });

      return NextResponse.json(
        {
          message: "Current Stream updated",
          updateCurrentStream,
        },
        {
          status: 200,
        }
      );
    }

    const newCurrentStream = await prisma.currentStream.create({
      data: {
        spaceId: spaceExists.id,
        streamId: streamExists.id,
      },
    });

    return NextResponse.json(
      {
        message: "Current Stream updated",
        newCurrentStream,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
    });
  }
}
