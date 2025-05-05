import { Suspense } from "react";
import RowErrorHandler from "./row-error-handler";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    return (
        <Suspense fallback={<p className="text-gray-500 text-center">Loading...</p>}>
            <RowErrorHandler params={params} />
        </Suspense>
    );
}