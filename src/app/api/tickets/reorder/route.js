/* imported from models */
import Ticket from "@/app/models/ticket";

import { NextResponse } from "next/server";

/* reorder */
export async function POST(req) {
  try {
    const body = await req.json();
    const tickets = body.tickets;

    //buen approach solo si los objetos son ligeros y son pocos
    await Ticket.deleteMany();
    await Ticket.insertMany(tickets);

    return NextResponse.json({ message: "Todo ordered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
