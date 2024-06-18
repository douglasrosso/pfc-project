function getTimestamp(date) {
    return new Date(date.substring(0,10)).getTime();
}

export async function getExpirationDateMiddleware(request) {
    await connectDB();
    const entries = await Entry.find();
    const today = new Date().getTime();

    const expiredEntries = entries.filter(e => getTimestamp(e.due_date) >= today)

    request.expirationCount = expiredEntries.length;
    request.expiredEntries = expiredEntries;
}