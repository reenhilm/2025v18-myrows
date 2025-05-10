import { createClient } from "@/utils/supabase/server";
import SignOutForm from "./sign-out-form";

export default async function HeaderAuth() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user && (
        <div className="mx-1 py-1 px-3 flex items-center">
            <div className="whitespace-nowrap px-3">
                Hey, {user.email}!
            </div>
            <SignOutForm />
        </div>
    )
}