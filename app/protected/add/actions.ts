'use server'

import { insertRows } from '@/app/db/db'
import { revalidatePath } from 'next/cache'

export async function createRow(formData: FormData) {
    const textValue = formData.get('text') as string

    if (!textValue || textValue.trim() === '') {
        // Optionally handle invalid input
        throw new Error('Text is required');
    }   

    const inserted = await insertRows({ text: textValue })

    if (inserted.success) {
        // Replace with relevant path if needed
        revalidatePath('/');
    }
    else {
        if (inserted.error)
            console.error(inserted.error);

        throw new Error('db backend error');
    }
}