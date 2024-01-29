import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import cn, { capitalize } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props) {
  const city = params.city;

  return {
    title: city === "all" ? "All Events" : `Events in ${capitalize(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const city = params.city;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }
  // const page = searchParams.page || 1;  here we considered using ?? to allow page to be 0. If we use ||, page will be 1 if it's 0. ?? is the nullish coalescing operator, which checks for null or undefined, not falsy values.You are only gonna get 1 if page is undefined or null, not 0 or false or anything else.

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className={cn("mb-28")}>
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${capitalize(city)}`}
      </H1>
      <Suspense key={city + parsedPage} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}
