"use server"
import ErrorDialog from "@/components/ui/error-dialog";
import { notFound } from "next/navigation";
import RowMain from "./row-main";
import { cookies } from "next/headers";
import { fetchRowViaApiWithCookies } from "@/utils/api-client";
import { isApiError } from "@/utils/type-guards";

export default async function RowErrorHandler({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const row = await fetchRowViaApiWithCookies(id, cookieHeader);
    
    if (isApiError(row)) {
        if (row.show404) {
            return notFound();
        }
        return <ErrorDialog message={row.message} />;
    }

    return <RowMain row={row} />;
}