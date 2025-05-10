import { NextResponse } from 'next/server'
import ApiError from '@/classes/api-error'
import { networkMessage } from '@/constants'
import { createClient } from '@/utils/supabase/server';

export async function POST() {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            return NextResponse.json(ApiError.fromError(500, error.message), { status: 500 });
        }

        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json(ApiError.fromError(500, networkMessage), { status: 500 });
    }
}