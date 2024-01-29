import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationControlsProps = {
  prveiousPath: string;
  nextPath: string;
};

const btnStyles =
  "text-white flex items-center gap-x-2 px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm";

export default function PaginationControls({
  prveiousPath,
  nextPath,
}: PaginationControlsProps) {
  return (
    <section className="w-full flex justify-between ">
      {prveiousPath ? (
        <Link href={prveiousPath} className={btnStyles}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}
      {nextPath && (
        <Link href={nextPath} className={btnStyles}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}
