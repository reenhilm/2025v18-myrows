'use server'

import { insertRows } from '@/actions-db'
import ApiError from '@/classes/api-error';
import { revalidatePath } from 'next/cache'

export async function createRow(formData: FormData): Promise<number | ApiError> {
    const textValue = formData.get('text') as string;

    if (!textValue || textValue.trim() === '') {
        return ApiError.fromError(412, 'Text is required');
    }   

    const inserted = await insertRows({ text: textValue })

    if (inserted instanceof ApiError) {
        console.error(ApiError);

        return inserted;
    }      

    // Replace with relevant path if needed
    revalidatePath('/');
    return inserted;
}