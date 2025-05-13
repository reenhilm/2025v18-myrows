'use client'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { setPassword } from '@/utils/api-client'
import { isApiError } from '@/utils/type-guards'

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        const password = formData.get("new_password")?.toString() || "";
        const result = await setPassword(password);

        if (isApiError(result)) {
            toast.error("Error", { description: result.message });
        }
        else {
            toast.success("Success", { description: `Successfully changed password ${result}` });
            formRef.current?.reset();
        }
    }

    return (
        <>
            <p>Sätta lösenordet</p>
            <form className="flex flex-col md:flex-row gap-5" ref={formRef} onSubmit={handleSubmit}>
            <Input id="new_password" name="new_password" type="password" required aria-label="new password" />
            <Button className='align-center' type="submit">Send</Button>
            </form>
        </>
    )
}

export default Page