import { NextRequest, NextResponse } from "next/server";

import { createUser } from "@/services/user.service";
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
    const user = await createUser(validation.data);

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        status: 201,
      },
    );
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
