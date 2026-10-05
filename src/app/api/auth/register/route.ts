import { NextResponse } from "next/server";
import { supabase } from "../../supabase/supabase";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const { firstName, middleName, lastName, email, password } = content;

    const { data, error, status } = await supabase
      .from("users")
      .select("email, id")
      .eq("email", email);

    if (error) {
      return NextResponse.json(
        {
          error: error,
        },
        {
          status: status,
        },
      );
    }

    if (data.length) {
      return NextResponse.json(
        {
          message: "Looks like an account with this email already exists.",
        },
        { status: 409 },
      );
    }

    await supabase.from("users").insert({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      password: password,
    });

    return NextResponse.json(
      {
        message: "Account created successfully! You’re all set to get started.",
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "We couldn’t create your account right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
