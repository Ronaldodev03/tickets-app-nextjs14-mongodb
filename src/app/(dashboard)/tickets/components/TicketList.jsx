"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";
import Item from "./Item";

export default function TicketList({ tickets }) {
  const [ticketsData, setTicketsData] = useState(tickets);

  /* send reorder list to db */
  const saveOrder = async () => {
    try {
      const res = await fetch(
        "https://tickets-app-nextjs14-mongodb-dnd.vercel.app/api/tickets/reorder",
        {
          method: "POST",
          body: JSON.stringify({ tickets: ticketsData }),
          "Content-Type": "application/json",
        }
      );

      if (!res.ok) {
        throw new Error("fail to reorder");
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Reorder.Group axis="y" values={ticketsData} onReorder={setTicketsData}>
        {ticketsData?.map((ticket) => {
          return (
            <Item key={ticket._id} ticket={ticket} onDragEnd={saveOrder} />
          );
        })}
      </Reorder.Group>

      {tickets?.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
