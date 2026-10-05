import { NextResponse } from "next/server";
import { supabase } from "../../supabase/supabase";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const { data } = await supabase
      .from("users")
      .select("email, firstName")
      .eq("email", content.email)
      .eq("password", content.password); 

    if (!data?.length) {
      return NextResponse.json(
        {
          message:
            "Looks like we couldn’t find your account. Double-check your details or create a new account to get started.",
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      message: `Welcome back, ${data[0].firstName}! You’re now signed in.`,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Something went wrong while signing you in. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
