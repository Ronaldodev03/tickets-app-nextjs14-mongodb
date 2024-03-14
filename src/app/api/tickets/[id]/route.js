import Ticket from "@/app/models/ticket";
import { NextResponse } from "next/server";

/* for getting one ticket   */
export async function GET(req, { params }) {
  try {
    const ticket = await Ticket.findById(params.id); // this is a method from mongoose
    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/* for updating one ticket */
export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const editedTicket = await req.json();
    await Ticket.findByIdAndUpdate(id, { ...editedTicket });

    return NextResponse.json({ message: "Todo Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

/* for deleting one ticket */
export const DELETE = async (req, { params }) => {
  try {
    await Ticket.findByIdAndDelete(params.id); // this is a method from mongoose
    return NextResponse.json({ message: "Todo Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
