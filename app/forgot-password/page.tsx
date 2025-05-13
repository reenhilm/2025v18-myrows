'use client';
import { useRef } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { forgotPassword } from '@/utils/api-client';
import { isApiError } from '@/utils/type-guards';
import { successForgotPasswordSent } from '@/constants';

export default function ForgotPassword() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        const email = formData.get("email")?.toString() || "";
        const result = await forgotPassword(email);

        if (isApiError(result)) {
            toast.error("Error", { description: result.message });
        }
        else {
            toast.success("Success", { description: successForgotPasswordSent });
        }
    }

    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <p>Skicka glömt lösenordsidan</p>
            <form className="flex flex-col md:flex-row gap-5" ref={formRef} onSubmit={handleSubmit}>
                <Input id="email" name="email" type="email" required placeholder="email@email.com" aria-label="email" />
                <Button className='align-center' type="submit">Send</Button>
            </form>
        </main>
    )
}