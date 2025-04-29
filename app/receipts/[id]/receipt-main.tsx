import Image from "next/image";
import { Receipt } from "@/interfaces/receipt";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ListItem from "./list-item";
import { formatSEK } from "@/utils/format/currency";
import { formatShortDate } from "@/utils/format/shortdate";

export default function ReceiptMain({ receipt }: { receipt: Receipt }) {
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <Card className="w-[380px]">
                <CardHeader>                    
                    <CardTitle>{receipt.retailer_name}</CardTitle>
                    <CardDescription>{receipt.title}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Image className="rounded-md border w-full" src={receipt.image_url} alt="" width={328} height={140} />
                    <div>
                        <ListItem category="Category" value={receipt.category.name} />
                        <ListItem category="Price" value={formatSEK(receipt.price_total)} />
                        <ListItem category="Purchase Date" value={formatShortDate(receipt.date.purchased)} />
                        <ListItem category="Uploaded by" value={`${receipt.uploader.fullname}, ${formatShortDate(receipt.date.purchased)}`} />
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}