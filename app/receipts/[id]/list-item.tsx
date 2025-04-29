export default function ListItem({ category, value }: { category: string, value: string }) {
    return (
        <div
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
        >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                    {category}
                </p>
                <p className="text-sm text-muted-foreground">
                    {value}
                </p>
            </div>
        </div>    
    )
}