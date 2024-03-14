import TicketList from "./TicketList";

async function getTickets() {
  const res = await fetch(
    "https://tickets-app-nextjs14-mongodb-dnd.vercel.app/api/tickets",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Error fetching");
  }

  return res.json();
}

export default async function TicketListWapper() {
  const { tickets } = await getTickets();
  return (
    <>
      <TicketList tickets={tickets} />
      <small className=" block text-center pt-4 hover:text-black">
        Drag and drop to reorder list
      </small>
    </>
  );
}
