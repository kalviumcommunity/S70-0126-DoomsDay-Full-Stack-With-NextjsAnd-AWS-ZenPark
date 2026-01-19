import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name } = body;

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: { name },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
    }
}
