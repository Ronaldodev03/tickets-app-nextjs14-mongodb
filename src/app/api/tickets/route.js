/* imported from models */
import Ticket from "@/app/models/ticket";

import { NextResponse } from "next/server";

/* create ticket */
export async function POST(req) {
  try {
    const ticket = await req.json();
    await Ticket.create(ticket); // this is a method from mongoose
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/* for getting all the tickets*/
export async function GET() {
  try {
    const tickets = await Ticket.find(); // this is a method from mongoose
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
