import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "../../../../lib/auth";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("auth_token");
    const token = cookie?.value;
    const user = await getUserFromToken(token ?? null);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in auth/me:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
