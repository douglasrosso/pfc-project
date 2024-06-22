import connectDB from "@/db/connect";
import Entry from "@/models/Entry";

function getTimestamp(date) {
  if (date) {
    const formatedDate = new Date(date.substring(0, 10)).getTime();
    return formatedDate;
  }
}

function sortByDueDate(a, b) {
  if (a.due_date > b.due_date) {
    return 1;
  }
  if (a.due_date < b.due_date) {
    return -1;
  }
  return 0;
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

  return {
    expiredEntries,
    expiredEntriesCount: expiredEntries.length,
    revenue: revenuePercentage,
    expense: expensePercentage,
  };
}
