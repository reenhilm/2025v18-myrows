import { Row } from "@/interfaces/rows";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function RowMain({ row }: { row: Row }) {
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <Card className="w-[380px]">
                <CardHeader>                    
                    <CardTitle>{row.id}</CardTitle>
                    <CardDescription>{row.text}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <p>{row.text}</p>
                </CardContent>
            </Card>
        </main>
    )
}