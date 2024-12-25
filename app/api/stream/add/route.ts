import authOptions from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { getYTData } from "@/lib/ytData";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

// Check if the URL matches the YouTube pattern

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // if (!session?.user.id) {
    //   return NextResponse.json(
    //     {
    //       message: "You must be logged in to create a space",
    //     },
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    const data = await req.json();

    if (!data.link) {
      return NextResponse.json(
        {
          message: "Video Link is required",
        },
        {
          status: 403,
        }
      );
    }
    if (!data.spaceId) {
      return NextResponse.json(
        {
          message: "Space Id is required",
        },
        {
          status: 403,
        }
      );
    }

    if (!data.addedBy) {
      return NextResponse.json(
        {
          message: "Id of User adding the stream is required",
        },
        {
          status: 403,
        }
      );
    }

    const space = await prisma.space.findUnique({
      where: {
        id: data.spaceId,
      },
    });
    // check if space exists
    if (!space) {
      return NextResponse.json(
        {
          message: "Space Not Found",
        },
        {
          status: 403,
        }
      );
    }

    if (!space.isActive) {
      return NextResponse.json(
        {
          message: "Space is not active",
        },
        {
          status: 403,
        }
      );
    }

    const addedByUser = await prisma.user.findUnique({
      where: {
        id: data.addedBy,
      },
    });

    if (!addedByUser) {
      return NextResponse.json(
        {
          message: "User addeing the stream not found",
        },
        {
          status: 403,
        }
      );
    }

    if (!youtubePattern.test(data.link)) {
      return NextResponse.json(
        {
          message: "Invalid youtube url",
        },
        {
          status: 403,
        }
      );
    }

    const parsedUrl = new URL(data.link);
    const videoId = parsedUrl.searchParams.get("v");

    if (!videoId) {
      return NextResponse.json(
        {
          message: "Link is not valid",
        },
        {
          status: 403,
        }
      );
    }

    const ytData = await getYTData(data.link);

    const stream = await prisma.stream.create({
      data: {
        name: ytData?.title,
        thumbnail: ytData?.thumbnail,
        videoId: videoId,
        addedBy: addedByUser.id,
        spaceId: space.id,
      },
    });

    return NextResponse.json(
      {
        stream,
        message: "Stream added Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: `Error Adding streams`,
    });
  }
}
