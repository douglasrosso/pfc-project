import { getUserFromToken } from "./utils/auth";

const isRESTManipulationMethod = (request) =>
  ["POST", "PUT", "DELETE"].includes(request.method);
const isAPIRoute = (request) => request.nextUrl.pathname.startsWith("/api");
const isNormalUser = (user) => user?.level?.toLowerCase() !== "admin";
const isRegisterRoute = (request) =>
  request.nextUrl.pathname.includes("/new");
const hasNumberOnPath = (request) => {
  const hasNumberRegex = new RegExp(/\d/);
  const paths = request.nextUrl.pathname.split("/");
  return hasNumberRegex.test(paths.at(-1));
};

export async function middleware(request) {
  const authToken = request.cookies.get("auth")?.value;
  const user = await getUserFromToken(authToken);

  if (
    isNormalUser(user) &&
    !isAPIRoute(request) &&
    (isRegisterRoute(request) || hasNumberOnPath(request))
  ) {
    const url = new URL("/home", request.url);
    url.searchParams.set("message", "Você não possui permissão!");
    return Response.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (!user && request.nextUrl.pathname.startsWith("/api")) {
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
    if (
      isNormalUser(user) &&
      (isRESTManipulationMethod(request) || hasNumberOnPath(request))
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Você nâo possui permissão!",
        }),
        { status: 200 }
      );
    }
  } else {
    if (!user && request.nextUrl.pathname !== "/") {
      return Response.redirect(new URL("/", request.url));
    }
    if (user && request.nextUrl.pathname === "/") {
      return Response.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/login|api/logout|.*\\.png$).*)"],
};
