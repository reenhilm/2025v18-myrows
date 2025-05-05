import { createClient } from "@/utils/supabase/server";
import Link from "next/link"

export default async function NavLinks() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            {user ? (
                <>
                    <Link href="/protected/find" className="mx-1 py-1 px-3 font-semibold uppercase hover:underline visually-hidden">FIND</Link>
                    <Link href="/protected/add" className="mx-1 py-1 px-3 font-semibold uppercase hover:underline visually-hidden">ADD</Link>
                </>
            ) : (
                <>
                    <div className="mx-1 py-1 px-3 whitespace-nowrap *:uppercase *:font-semibold *:cursor-pointer *:hover:underline">
                        <Link href="/login">LOGIN</Link>
                    </div>
                </>                    
            )}
        </>
    )
}