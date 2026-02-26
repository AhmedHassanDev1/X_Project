import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const publicRoutes = ["/signin", "/signup"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const refreshToken = request.cookies.get("refreshToken")?.value;


  if (!refreshToken && !isPublicRoute) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }


  if (refreshToken && isPublicRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};