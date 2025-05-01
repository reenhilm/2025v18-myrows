import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FindPage from "./find-page";

export default async function PrivatePageClient() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <FindPage/>
    );
}