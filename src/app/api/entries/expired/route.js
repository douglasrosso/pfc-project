import { getExpirationDateMiddleware } from "@/middlewares/expirationMiddleware";

export async function GET(request) {
  const {
    expiredEntries,
    expiredEntriesCount,
    revenue,
    expense,
    releasesOfTheOrderedDay,
    pastDueReleasesSorted,
  } = await getExpirationDateMiddleware();

  return new Response(
    JSON.stringify({
      success: true,
      message: "",
      data: {
        expiredEntries,
        expiredEntriesCount,
        revenue,
        expense,
        releasesOfTheOrderedDay,
        pastDueReleasesSorted,
      },
    })
  );
}
