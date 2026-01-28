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
        const { plate, model, size } = body;

        const vehicle = await prisma.vehicle.create({
            data: {
                plate,
                model,
                size,
                userId: session.user.id,
            },
        });

        return NextResponse.json(vehicle, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create vehicle" }, { status: 500 });
    }
}
