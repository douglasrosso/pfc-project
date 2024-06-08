import cookie from "cookie";

export default function handler(req, res) {
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

  res.setHeader("Set-Cookie", serializedCookie);

  res.status(200).json({ success: true, message: "Cookie has been set" });
}
