import jwt from "jsonwebtoken";
import cookie from "cookie";
import * as jose from "jose";

export async function isTokenValid(token) {
  const encodedSecret = new TextEncoder().encode(process.env.SECRET_KEY);
  let result = false;

  if (!token) {
    result = false;
  }

  try {
    const decoded = await jose.jwtVerify(token, encodedSecret);
    result = !!decoded?.payload?.user;
  } catch {
    result = false;
  }

  return result;
}

export async function authenticate(user) {
  return new Promise((res, rej) => {
    jwt.sign(
      { user: user },
      process.env.SECRET_KEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          rej(
            new Response(
              JSON.stringify({
                success: false,
                message: "Erro ao efetuar login!",
              }),
              { status: 500 }
            )
          );
        } else {
          const serializedCookie = cookie.serialize("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
          });
          res(
            new Response(
              JSON.stringify({
                success: true,
                message: "login efetuado com sucesso!",
              }),
              {
                status: 200,
                headers: {
                  "Set-Cookie": serializedCookie,
                  "Content-Type": "application/json",
                },
              }
            )
          );
        }
      }
    );
  });
}
