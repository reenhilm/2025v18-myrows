export function formatSEK(decimale: number): string {
    const formatted = new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2,
    }).format(decimale);
    return formatted;
}