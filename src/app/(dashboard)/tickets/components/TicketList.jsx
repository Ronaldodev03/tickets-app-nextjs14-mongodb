"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";
import Item from "./Item";

export default function TicketList({ tickets }) {
  const [ticketsData, setTicketsData] = useState(tickets);

  return (
    <>
      <Reorder.Group axis="y" values={ticketsData} onReorder={setTicketsData}>
        {ticketsData?.map((ticket) => {
          return <Item key={ticket._id} ticket={ticket} />;
        })}
      </Reorder.Group>

      {tickets?.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
