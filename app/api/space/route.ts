import authOptions from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "You must be logged in to access the spaces",
        },
        {
          status: 401,
        }
      );
    }

    const allSpaces = await prisma.space.findMany({
      where: {
        hostId: session?.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "All spaces retrived succesfully",
        spaces: allSpaces,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: `Error retrieving spaces`,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "You must be logged in to create a space",
        },
        {
          status: 401,
        }
      );
    }

    const { spaceName } = await req.json();

    if (!spaceName) {
      return NextResponse.json(
        {
          message: "Space name Required",
        },
        {
          status: 400,
        }
      );
    }

    const newSpace = await prisma.space.create({
      data: {
        name: spaceName,
        hostId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Space created Successfully",
        space: newSpace,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: `Error creating spaces`,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "You must be logged in to delete this space",
          success: false,
        },
        {
          status: 401,
        }
      );
    }
    const spaceId = req.nextUrl.searchParams.get("spaceId");

    if (!spaceId) {
      return NextResponse.json(
        {
          message: "Space Id Required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const space = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
    });

    if (!space) {
      return NextResponse.json(
        {
          message: "Space not found",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    if (space.hostId !== session.user.id) {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this space",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await prisma.space.delete({
      where: {
        id: spaceId,
      },
    });

    return NextResponse.json(
      {
        message: "Space deleted Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      message: `Error creating spaces`,
    });
  }
}