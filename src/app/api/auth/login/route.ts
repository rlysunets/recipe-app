import { NextRequest, NextResponse } from "next/server";

import { loginUser } from "@/services/user.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await loginUser(body.email, body.password);

    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    response.cookies.set("userId", String(user.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Login failed",
      },
      {
        status: 401,
      },
    );
  }
}
