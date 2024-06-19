import jwt from "jsonwebtoken";
import cookie from "cookie";
import * as jose from "jose";

export async function getUserFromToken(token) {
  const encodedSecret = new TextEncoder().encode(process.env.SECRET_KEY);
  let result = null;

  if (!token) {
    result = null;
  }

  try {
    const decoded = await jose.jwtVerify(token, encodedSecret);
    result = decoded?.payload?.user;
  } catch {
    result = null;
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
            httpOnly: false,
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
