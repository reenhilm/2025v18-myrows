import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import ApiError from '@/classes/api-error'
import { nextworkMessage, unauthorized } from '@/constants'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { text } = body;

        if (!text || text.trim() === '') {
            return NextResponse.json(ApiError.fromError(412, 'Text is required'), { status: 412 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(ApiError.fromError(401, unauthorized), { status: 401 });
        }

        const { data, error } = await supabase
            .from('rows')
            .insert({ text })
            .select();

        if (error) {
            return NextResponse.json(ApiError.fromError(500, error.message), { status: 500 });
        }

        const insertedId = data?.[0]?.id;

        if (typeof insertedId !== 'number') {
            return NextResponse.json(ApiError.fromError(500, 'Insert failed'), { status: 500 });
        }

        return NextResponse.json({ id: insertedId }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json(ApiError.fromError(500, nextworkMessage), { status: 500 });
    }
}