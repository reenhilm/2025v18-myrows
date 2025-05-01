import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

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
            <form action={signOutAction}>
                <Button type="submit" variant={"outline"}>
                    Sign out
                </Button>
            </form>
        </div>
    )
}