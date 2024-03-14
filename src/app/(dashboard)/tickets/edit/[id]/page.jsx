import { notFound } from "next/navigation"; // for the not-found when they are not in the staticParams
import EditForm from "./components/EditForm";

export const dynamicParams = true; // default val = true

/* For SSG | this is done in the routes with dynamic path */
export async function generateStaticParams() {
  const res = await fetch(
    "https://tickets-app-nextjs14-mongodb-dnd.vercel.app/api/tickets"
  );

  const { tickets } = await res.json();

  return tickets.map((ticket) => ({
    id: ticket._id,
  }));
}

/* getting one ticket */
async function getTicket(id) {
  const res = await fetch(
    `https://tickets-app-nextjs14-mongodb-dnd.vercel.app/api/tickets/${id}`,
    {
      cache: "no-store",
      //    next:{
      //    revalidate:10
      //  }
    }
  );

  if (!res.ok) {
    notFound(); //this will trigger the closest not-found custom page.
  }

  return res.json();
}

export default async function EditTicket({ params }) {
  const { ticket } = await getTicket(params.id);

  return (
    <main>
      <h2 className="text-center">Edit Ticket</h2>
      <EditForm ticket={ticket} />
    </main>
  );
}
