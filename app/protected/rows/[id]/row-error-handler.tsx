"use server"
import ApiError from "@/classes/api-error";
import ErrorDialog from "@/components/ui/error-dialog";
import { notFound } from "next/navigation";
import RowMain from "./row-main";
import { cookies } from "next/headers";
import { fetchRowViaApiWithCookies } from "@/utils/api-client";

export default async function RowErrorHandler({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const cookieHeader = cookies().toString();
    const row = await fetchRowViaApiWithCookies(id, cookieHeader);

    if (row instanceof ApiError) {
        if (row.show404) {
            return notFound();
        }
        return <ErrorDialog message={row.message} />;
    }

    return <RowMain row={row} />;
}