"use server"
import ApiError from "@/classes/api-error";
import ErrorDialog from "@/components/ui/error-dialog";
import { notFound } from "next/navigation";
import ReceiptMain from "./receipt-main";
import { fetchReceiptById } from "@/actions";

export default async function ReceiptErrorHandler({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    //TODO get group from logged in user
    const receipt = await fetchReceiptById(id, 2);

    if (receipt instanceof ApiError) {
        if (receipt.show404) {
            return notFound();
        }
        return <ErrorDialog message={receipt.message} />;
    }

    return <ReceiptMain receipt={receipt} />;
}