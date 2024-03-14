"use client";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { ReorderIcon } from "./ReorderIcon";
import { useRaisedShadow } from "./use-raised-shadow";
import { useRouter } from "next/navigation";

export default function TicketList({ tickets }) {
  const [ticketsData, setTicketsData] = useState(tickets);
  // const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  const router = useRouter();

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
            <Reorder.Item
              key={ticket._id}
              value={ticket}
              id={ticket}
              // style={{ boxShadow, y }}
              //  dragListener={false}
              // dragControls={dragControls}
              className="card my-5 group"
              onDragEnd={saveOrder}
            >
              <Link href={`/tickets/${ticket._id}`}>
                <h3>{ticket.title}</h3>
                <p>{ticket.body.slice(0, 200)}...</p>
                <div className={`pill ${ticket.priority}`}>
                  {ticket.priority} priority
                </div>
                <MdOutlineRemoveRedEye
                  className=" absolute top-1 right-3 scale-75 opacity-0 group-hover:opacity-100 text-gray-400 transition-all duration-300"
                  size={30}
                />
              </Link>
              <ReorderIcon dragControls={dragControls} />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {tickets?.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
}
