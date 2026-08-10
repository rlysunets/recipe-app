import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

import { CreateUserDto } from "@/types/user";

export class UserService {
  static async createUser(data: CreateUserDto) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}
