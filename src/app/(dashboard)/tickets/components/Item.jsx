import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { ReorderIcon } from "./ReorderIcon";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { useRouter } from "next/navigation";

import Link from "next/link";

const Item = ({ ticket }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
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
    <Reorder.Item
      value={ticket}
      id={ticket}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      className="card my-5"
      onDragEnd={saveOrder}
    >
      <div className=" select-none">
        <h3>{ticket.title}</h3>
        <p>{ticket.body.slice(0, 200)}...</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
        <Link href={`/tickets/${ticket._id}`}>
          <MdOutlineRemoveRedEye
            className=" absolute top-1 right-3 scale-75 hover:text-primary  text-gray-400 transition-all duration-300"
            size={30}
          />
        </Link>
      </div>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};

export default Item;
