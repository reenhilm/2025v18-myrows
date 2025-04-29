export function formatShortDate(date: string): string {
    const dateISO = new Date(date.replace(' ', 'T')); // Convert to ISO string
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    };

    const swedishDate = new Intl.DateTimeFormat('sv-SE', options).format(dateISO);
    return swedishDate;
}