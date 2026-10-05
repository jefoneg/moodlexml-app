import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supabase/supabase";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");

    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (!data?.length) {
      return NextResponse.json(
        {
          message:
            "If this email is linked to an account, you’ll receive password reset instructions shortly.",
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json({
      
    });
  } catch {}
}
