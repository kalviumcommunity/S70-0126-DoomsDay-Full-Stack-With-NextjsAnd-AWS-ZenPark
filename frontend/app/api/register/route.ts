import dbConnect from "@/lib/db";
import { User } from "@/lib/models/User";
import { hash } from "bcryptjs";
import { userSchema } from "@/lib/schemas/userSchema";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { handleError } from "@/lib/errorHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const validatedData = userSchema.parse(body);
        const { email, password, role } = validatedData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return sendError(
                "User with this email already exists",
                ERROR_CODES.CONFLICT,
                409
            );
        }

        const hashedPassword = await hash(password, 10);

        // Map UI roles to Database roles if necessary
        const dbRole = role === "MANAGER" ? "ADMIN" : role === "ADMIN" ? "ADMIN" : "DRIVER";

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: dbRole,
        });

        // Strip password
        const userObj = newUser.toObject();
        const { password: newUserPassword, ...rest } = userObj;

        return sendSuccess({ user: rest }, "User created successfully", 201);

    } catch (error) {
        return handleError(error, "POST /api/register");
    }
}
