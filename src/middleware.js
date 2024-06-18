import { getExpirationDateMiddleware } from "./middlewares/expirationMiddleware";
import { isTokenValid } from "./utils/auth";

export async function middleware(request) {
  const authToken = request.cookies.get("auth")?.value;
  const isAuthenticated = await isTokenValid(authToken);

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (!isAuthenticated && request.nextUrl.pathname.startsWith("/api")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Usuário não autenticado!",
        }),
        {
          status: 401,
        }
      );
    }

    if(request.nextUrl.pathname === "/api/entries") {
      await getExpirationDateMiddleware(request);
    }
  } else {
    if (!isAuthenticated && request.nextUrl.pathname !== "/") {
      return Response.redirect(new URL("/", request.url));
    }
    if (isAuthenticated && request.nextUrl.pathname === "/") {
      return Response.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/login|api/logout|.*\\.png$).*)"],
};
