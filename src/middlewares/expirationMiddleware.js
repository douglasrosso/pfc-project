import connectDB from "@/db/connect";
import Entry from "@/models/Entry";

function getTimestamp(date) {
  if (date) {
    const formattedDate = new Date(date.substring(0, 10)).getTime();
    return formattedDate;
  }
  return null;
}

function sortByDueDate(a, b) {
  return getTimestamp(a.due_date) - getTimestamp(b.due_date);
}

export async function getExpirationDateMiddleware() {
  await connectDB();
  const entries = await Entry.find();
  const today = new Date().getTime();

  const expiredEntries = entries
    .filter(
      (e) =>
        getTimestamp(e.due_date) <= today &&
        getTimestamp(e.payment_date) <= today
    )
    .sort(sortByDueDate);

  const totalRevenue = expiredEntries.filter(
    (item) => item.type === "Receita"
  ).length;
  const totalExpense = expiredEntries.filter(
    (item) => item.type === "Despesa"
  ).length;

  const revenuePercentage = (totalRevenue / expiredEntries.length) * 100;
  const expensePercentage = (totalExpense / expiredEntries.length) * 100;

  const { pastDueReleases, releasesOfTheDay } = entries.reduce(
    (acc, e) => {
      const dueDate = getTimestamp(e.due_date);
      const paymentDate = getTimestamp(e.payment_date);

      if (dueDate === today && paymentDate === today) {
        acc.releasesOfTheDay.push(e);
      } else if (dueDate < today && paymentDate <= today) {
        acc.pastDueReleases.push(e);
      }

      return acc;
    },
    { pastDueReleases: [], releasesOfTheDay: [] }
  );

  const releasesOfTheOrderedDay = releasesOfTheDay.sort(sortByDueDate);
  const pastDueReleasesSorted = pastDueReleases.sort(sortByDueDate);

  return {
    expiredEntries,
    expiredEntriesCount: expiredEntries.length,
    revenue: revenuePercentage,
    expense: expensePercentage,
    releasesOfTheOrderedDay,
    pastDueReleasesSorted,
  };
}
