import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserFromToken } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
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
