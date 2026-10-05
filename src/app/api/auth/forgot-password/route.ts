import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../supabase/supabase";

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();

    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", content.email);

    if (!data?.length) {
      return NextResponse.json(
        {
          message:
            "If this email is linked to an account, you’ll receive password reset instructions shortly.",
          isAuth: false
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json({
      message: "success",
      isAuth: true
    });
  } catch {
    NextResponse.json(
      {
        message:
          "We’re having trouble accessing the data right now. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}
