import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const protectedRoutes = ["/profile", "/order", "/admin"];

    const sessionCookie = request.cookies.get(
        process.env.NODE_ENV === "development" ? "authjs.session-token" : "__Secure-authjs.session-token"
    )?.value;

    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) && !sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url).toString());
    }
    
    return NextResponse.next();
}
