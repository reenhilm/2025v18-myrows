'use client'
import { Button } from '@/components/ui/button'
import { createRow } from './actions'
import { toast } from "sonner"
import { useRef } from 'react'

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleCreateRow = async (formData: FormData) => {
        const result = await createRow(formData);

        if (result.success) {
            toast.success("Success", { description: result.errorMessage });
            formRef.current?.reset();
        } else {
            toast.error("Error", { description: result.errorMessage });
        }
    }

    return (
        <form className="flex flex-col md:flex-row gap-5" ref={formRef} action={handleCreateRow}>
            <input type="text" name="text" required placeholder="text in your row" aria-label="text in your row" />
            <Button className='align-center' type="submit">Create row</Button>
        </form>
    )
}

export default Page