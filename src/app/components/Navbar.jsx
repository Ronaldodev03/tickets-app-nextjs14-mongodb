"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav>
      <h1>TicketsApp</h1>
      <ul className=" flex gap-5">
        <Link
          href="/"
          className={` ${
            path === "/" &&
            "border-b-[3px] border-solid border-primary transition-all "
          }`}
        >
          Dashboard
        </Link>
        <Link
          className={` ${
            path === "/tickets" &&
            "border-b-[3px] border-solid border-primary transition-all"
          }`}
          href="/tickets"
        >
          Tickets
        </Link>
      </ul>
    </nav>
  );
}
