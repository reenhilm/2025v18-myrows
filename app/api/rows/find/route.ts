import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import ApiError from '@/classes/api-error'
import { unauthorized, networkMessage } from '@/constants'

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text || typeof text !== 'string' || text.trim().length < 3) {
            return NextResponse.json(ApiError.fromError(400, 'Search text must be at least 3 characters long'), { status: 400 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(ApiError.fromError(401, unauthorized), { status: 401 });
        }

        const { data, error } = await supabase
            .from('rows')
            .select();

        if (error) {
            return NextResponse.json(ApiError.fromError(500, error.message), { status: 500 });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundRows = data.filter((r: any) =>
            r.text.toUpperCase().includes(text.toUpperCase())
        );

        return NextResponse.json(foundRows, { status: 200 });

    } catch {
        return NextResponse.json(ApiError.fromError(500, networkMessage), { status: 500 });
    }
}