import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import { ReorderIcon } from "./ReorderIcon";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";

const Item = ({ ticket, saveOrder }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={ticket}
      id={ticket}
      style={{ boxShadow, y }}
      // dragListener={false} // I have comment this line b/c DnD using ReorderIcon was not working in tactil
      dragControls={dragControls}
      onDragEnd={saveOrder}
      className="card my-5"
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
