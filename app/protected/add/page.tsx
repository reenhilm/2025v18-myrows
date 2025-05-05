import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AddForm from './add-form';

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
            <AddForm />
        </main>
    )
}