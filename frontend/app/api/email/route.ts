import { Resend } from "resend";
import { NextResponse } from "next/server";
import { InfoType } from "@/types";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

import { NetlifyWelcomeEmail } from "@/emails/details";

export async function POST(request: Request) {
  const checked = await request.json();
  await resend.emails.send({
    from: "you@example.com",
    to: "rajat1998sharma1@gmail.com",
    subject: "hello world",
    react: NetlifyWelcomeEmail({
      checked,
    }),
  });

  return NextResponse.json({
    status: "Ok",
  });
}
