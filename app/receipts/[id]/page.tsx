import { Suspense } from "react";
import ReceiptErrorHandler from "./receipt-error-handler";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<p className="text-gray-500 text-center">Loading...</p>}>
            <ReceiptErrorHandler params={params} />
        </Suspense>
    );
}