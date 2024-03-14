"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({ ticket }) {
  const router = useRouter();

  const [title, setTitle] = useState(ticket.title);
  const [body, setBody] = useState(ticket.body);
  const [priority, setPriority] = useState(ticket.priority);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const editedTicket = {
      title,
      body,
      priority,
      user_email: ticket.user_email,
    };

    const res = await fetch(
      `https://tickets-app-nextjs14-mongodb-dnd.vercel.app/api/tickets/${ticket._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTicket),
      }
    );

    if (res.status === 200) {
      router.push(`/tickets/${ticket._id}`);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full sm:w-[30rem]">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
          rows={8}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Editing...</span>}
        {!isLoading && <span>Edit Ticket</span>}
      </button>
    </form>
  );
}
