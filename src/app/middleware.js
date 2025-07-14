import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
    matcher: "/dashboard/:path*",
};
