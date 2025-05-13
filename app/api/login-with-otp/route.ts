import { NextRequest, NextResponse } from 'next/server'
import ApiError from '@/classes/api-error'
import { networkMessage } from '@/constants'
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    try {

        const { email, token } = await req.json();

        if (!email || typeof email !== 'string') {            
            return NextResponse.json(ApiError.fromError(400, 'Invalid email'), { status: 400 });
        }

        if (!token || typeof token !== 'string') {            
            return NextResponse.json(ApiError.fromError(400, 'Invalid token'), { status: 400 });
        }        

        const supabase = await createClient();

        const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'recovery' })
        const { session } = data;

        if (!session) {
            return NextResponse.json(ApiError.fromError(500, 'No session returned'), { status: 500 });
        }

        console.log('verifyOtp', { data, error });

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