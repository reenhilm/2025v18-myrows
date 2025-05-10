'use client'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { createRowViaApi } from '@/utils/api-client'
import { isApiError } from '@/utils/type-guards'

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formRef.current!);
        const text = formData.get("text")?.toString() || "";
        const result = await createRowViaApi(text);

        if (isApiError(result)) {
            toast.error("Error", { description: result.message });
        }
        else {
            toast.success("Success", { description: `Successfully created row ${result}` });
            formRef.current?.reset();
        }
    }

    return (
        <form className="flex flex-col md:flex-row gap-5" ref={formRef} onSubmit={handleSubmit}>
            <Input type="text" name="text" required placeholder="text in your row" aria-label="text in your row" />
            <Button className='align-center' type="submit">Create row</Button>
        </form>
    )
}

export default Page