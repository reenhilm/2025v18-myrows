"use server"
import ApiError from "@/classes/api-error";
import ErrorDialog from "@/components/ui/error-dialog";
import { notFound } from "next/navigation";
import RowMain from "./row-main";
import { fetchRowById } from "@/actions";

export default async function RowErrorHandler({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    //TODO get group from logged in user
    const receipt = await fetchRowById(id);

    if (receipt instanceof ApiError) {
        if (receipt.show404) {
            return notFound();
        }
        return <ErrorDialog message={receipt.message} />;
    }

    return <RowMain row={receipt} />;
}