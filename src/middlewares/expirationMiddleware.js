import connectDB from "@/db/connect";
import Entry from "@/models/Entry";

function getTimestamp(date) {
  if (!date) return null;

  return new Date(date.substring(0, 10)).getTime();
}

function sortByDueDate(a, b) {
  return getTimestamp(a.due_date) - getTimestamp(b.due_date);
}

function isDate(date1) {
  return {
    greaterThan: (date2) => {
      return date1 > date2;
    },
    smallerThan: (date2) => {
      return date1 < date2;
    },
  };
}

export async function getExpirationDateMiddleware() {
  await connectDB();
  const entries = await Entry.find();
  const today = getTimestamp(new Date().toISOString());

  const expiredEntries = entries
    .filter(
      (e) =>
        getTimestamp(e.due_date) <= today &&
        (!getTimestamp(e.payment_date) || getTimestamp(e.payment_date) > today)
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

  const { pastDueReleases, releasesOfTheDay } = expiredEntries.reduce(
    (acc, e) => {
      const dueDate = getTimestamp(e.due_date);
      const paymentDate = getTimestamp(e.payment_date);

      if (dueDate === today && (!paymentDate || paymentDate > today)) {
        acc.releasesOfTheDay.push(e);
      } else if (dueDate < today && (!paymentDate || paymentDate > today)) {
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
