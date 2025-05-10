import { NextRequest, NextResponse } from 'next/server'
import ApiError from '@/classes/api-error'
import { networkMessage } from '@/constants'
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || typeof email !== 'string') {            
            return NextResponse.json(ApiError.fromError(400, 'Invalid email'), { status: 400 });
            // TODO do more email validation
        }

        if (!password || typeof password !== 'string') {            
            return NextResponse.json(ApiError.fromError(400, 'Invalid password'), { status: 400 });
            // TODO do more password validation (is it secure enough?)
        }       

        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            if (error.status === 400)
                return NextResponse.json(ApiError.fromError(400, error.message), { status: 400 });

            return NextResponse.json(ApiError.fromError(500, error.message), { status: 500 });
        }

        return NextResponse.json({ status: 200 });

    } catch {
        return NextResponse.json(ApiError.fromError(500, networkMessage), { status: 500 });
    }
}