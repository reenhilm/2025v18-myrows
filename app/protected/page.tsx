import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PrivatePageClient() {
    const supabase = await createClient();
    
    const {
            data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <p>Hello { user?.email }</p>
        </main>
    );
}