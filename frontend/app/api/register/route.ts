import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["DRIVER", "MANAGER"]), // Admin handled separately or manually promoted
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, role } = userSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role === "MANAGER" ? "ADMIN" : "DRIVER", // Map Manager UI choice to ADMIN role for now, or use MANAGER enum
            },
        });

        // Strip password
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
