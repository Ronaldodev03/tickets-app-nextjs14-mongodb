import Link from "next/link";
import { notFound } from "next/navigation"; // for the not-found when they are not in the staticParams
import Delete from "./components/Delete";

export const dynamicParams = true; // default val

/*For SSG | this is done in the routes with dynamic path */
/* export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/tickets");

  const { tickets } = await res.json();

  return tickets.map((ticket) => ({
    id: ticket._id,
  }));
}
 */
/* getting one ticket */
async function getTicket(id) {
  // await new Promise((r) => setTimeout(r, 5000));
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    cache: "no-store",
    //next: {
    //   revalidate: 60,
    // },
  });

  if (!res.ok) {
    notFound(); //this will trigger the closest not-found custom page.
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  const { ticket } = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <Link href={`/tickets/edit/${params.id}`} className="ml-auto">
          <button className="btn-primary">Edit Ticket</button>
        </Link>
      </nav>
      <div className="card">
        <h3>{ticket?.title}</h3>
        <small>Created by {ticket?.user_email}</small>
        <p>{ticket?.body}</p>
        <div className={`pill ${ticket?.priority}`}>
          {ticket?.priority} priority
        </div>
      </div>
      <Delete id={ticket?._id} />
    </main>
  );
}
