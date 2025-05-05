import { Button } from '@/components/ui/button'
import { createRow } from './actions'
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <form className="flex flex-col md:flex-row gap-5">
                <input id="text" name="text" type="text" required placeholder="text in your row" aria-label="text in your row" />
                <Button className='align-center' formAction={createRow}>Create row</Button>
            </form>
        </main>
    )
}