'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { login } from '@/utils/api-client';
import { isApiError } from '@/utils/type-guards';

export default function LoginPage() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        const result = await login(email, password);

        if (isApiError(result)) {
            toast.error("Error", { description: result.message });
        }
        else {
            window.location.href = '/protected';
        }
    }

    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <form className="flex flex-col md:flex-row gap-5" ref={formRef} onSubmit={handleSubmit}>
                <Input id="email" name="email" type="email" required placeholder="email@email.com" aria-label="email" />
                <Input id="password" name="password" type="password" required aria-label="password" />
                <Button className='align-center' type="submit">Log in</Button>
            </form>
        </main>
    )
}