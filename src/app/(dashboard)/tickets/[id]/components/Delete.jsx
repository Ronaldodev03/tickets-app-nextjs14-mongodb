"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Delete = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /* delete one*/
  const deleteTicket = async (id) => {
    setIsLoading(true);
    const res = await fetch(
      `https://tickets-app-nextjs14-mongodb-dnd.vercel.app/api/tickets/${id}`,

      { method: "DELETE" }
    );

    if (res.ok) {
      router.push(`/tickets`);
      router.refresh();
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={() => deleteTicket(id)}
      className=" bg-red-500 text-white mt-10"
    >
      {isLoading && <span>Deleting...</span>}
      {!isLoading && <span> Delete Ticket</span>}
    </button>
  );
};

export default Delete;
