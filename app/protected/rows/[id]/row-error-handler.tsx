"use server"
import ApiError from "@/classes/api-error";
import ErrorDialog from "@/components/ui/error-dialog";
import { notFound } from "next/navigation";
import RowMain from "./row-main";
import { fetchRowById } from '@/actions-db';

export default async function RowErrorHandler({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    //TODO get group from logged in user
    const row = await fetchRowById(id);

    if (row instanceof ApiError) {
        if (row.show404) {
            return notFound();
        }
        return <ErrorDialog message={row.message} />;
    }

    return <RowMain row={row} />;
}