'use server'

import { insertRows } from '@/app/db/db'
import insertResponse from '@/interfaces/db-response';
import { revalidatePath } from 'next/cache'

export async function createRow(formData: FormData): Promise<insertResponse> {
    const textValue = formData.get('text') as string;

    if (!textValue || textValue.trim() === '') {
        return { success: false, errorMessage: 'Text is required' };
    }   

    const inserted = await insertRows({ text: textValue })

    if (inserted.success) {
        // Replace with relevant path if needed
        revalidatePath('/');
        return { success: true, errorMessage: 'Row created successfully!' };
    }
    else {
        if (inserted.errorMessage)
            console.error(inserted.errorMessage);

        return { success: false, errorMessage: 'DB backend error' };
    }
}