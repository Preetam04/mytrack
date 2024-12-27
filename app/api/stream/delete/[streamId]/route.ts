import authOptions from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // const param

    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "User not logged in",
        },
        {
          status: 401,
        }
      );
    }
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
