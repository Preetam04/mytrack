import authOptions from "@/lib/auth-options";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.nextUrl.href);

    if (url.searchParams.get("spaceId")) {
      const spaceData = await prisma.space.findUnique({
        where: {
          id: url.searchParams.get("spaceId") ?? "",
        },
        include: {
          streams: true,
          host: true,
        },
      });

      // console.log(spaceData);

      if (!spaceData) {
        return NextResponse.json(
          {
            message: "Space not found",
          },
          {
            status: 403,
          }
        );
      }

      return NextResponse.json(
        {
          message: "Space data fetched successfully",
          spaces: spaceData,
        },
        { status: 200 }
      );
    }

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

export async function PATCH(req: NextRequest) {
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

    const { spaceId, isActive } = await req.json();
    console.log(spaceId, isActive);

    if (!spaceId) {
      return NextResponse.json(
        {
          message: "Space Id is Required",
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
        },
        {
          status: 400,
        }
      );
    }

    if (space?.hostId !== session.user.id) {
      return NextResponse.json(
        {
          message: "You are not allowed the update the space data",
        },
        {
          status: 403,
        }
      );
    }

    const updatedSpace = await prisma.space.update({
      where: {
        id: spaceId,
      },
      data: {
        isActive: isActive,
      },
    });

    return NextResponse.json(
      {
        message: "Space is Active",
        space: updatedSpace,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: `Error updating space`,
    });
  }
}
