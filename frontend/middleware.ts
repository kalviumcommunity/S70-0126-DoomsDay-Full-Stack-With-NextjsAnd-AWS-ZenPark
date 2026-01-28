import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Admin Route Protection
        if (path.startsWith("/admin")) {
            if (token?.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
        }

        // Driver Route Protection (Implicit: Middleare protects all matched routes, so if they are here, they are authed)
        // If we needed role checks for driver routes we could add them here, but standard role is DRIVER so it's fine.
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/booking/:path*",
        "/history/:path*",
        "/settings/:path*",
        "/sites/:path*", // Protect site details as well
        // Exclude /auth, /api/auth, /api/register, /_next, /static, /favicon.ico based on NextAuth logic usually, 
        // but explicit matcher helps avoid loops.
    ],
}
