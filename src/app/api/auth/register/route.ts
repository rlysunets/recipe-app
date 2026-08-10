import { NextRequest, NextResponse } from "next/server";

import { UserService } from "@/services/user.service";
import { createUserSchema } from "@/validations/user.validation";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createUserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const user = await UserService.createUser(validation.data);

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 409,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
