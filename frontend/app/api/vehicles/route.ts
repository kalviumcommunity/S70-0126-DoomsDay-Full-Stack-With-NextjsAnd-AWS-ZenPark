import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { Vehicle } from "@/lib/models/Vehicle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const { plate, model, size } = body;

        const vehicle = await Vehicle.create({
            plate,
            vehicleModel: model,
            size,
            userId: session.user.id,
        });

        return NextResponse.json(vehicle, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create vehicle" }, { status: 500 });
    }
}
