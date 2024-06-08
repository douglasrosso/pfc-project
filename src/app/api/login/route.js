import cookie from "cookie";

export function GET(request) {
  const serializedCookie = cookie.serialize(
    "auth",
    "8794c472-0399-40e7-aaf5-816d71c9b82c",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    }
  );

  return new Response(
    JSON.stringify({ success: true, message: "login efetuado com sucesso!" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": serializedCookie,
        "Content-Type": "application/json",
      },
    }
  );
}
