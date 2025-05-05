'use client'
import { Button } from '@/components/ui/button'
import { createRow } from './actions'
import { toast } from "sonner"
import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import ApiError from '@/classes/api-error'

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleCreateRow = async (formData: FormData) => {
        const result = await createRow(formData);

        if (result instanceof ApiError) {
            toast.error("Error", { description: result.message });
        }
        else {
            toast.success("Success", { description: `Successfully created row ${result}` });
            formRef.current?.reset();
        }
    }

    return (
        <form className="flex flex-col md:flex-row gap-5" ref={formRef} action={handleCreateRow}>
            <Input type="text" name="text" required placeholder="text in your row" aria-label="text in your row" />
            <Button className='align-center' type="submit">Create row</Button>
        </form>
    )
}

export default Page