export function middleware(request) {
  const currentUser = request.cookies.get("auth")?.value;
  if (request.nextUrl.pathname.startsWith("/api")) {
    if (!currentUser && request.nextUrl.pathname.startsWith("/api")) {
      return new Response(
        JSON.stringify({ success: false, message: "Usuário não autenticado!" }),
        { status: 401 }
      );
    }
  } else {
    if (!currentUser && request.nextUrl.pathname !== "/") {
      return Response.redirect(new URL("/", request.url));
    }
    if (currentUser && request.nextUrl.pathname === "/") {
      return Response.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
