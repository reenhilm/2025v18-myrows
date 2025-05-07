import { NextRequest, NextResponse } from 'next/server'
import ApiError from '@/classes/api-error'
import { unauthorized, nextworkMessage } from '@/constants'
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id || typeof id !== 'string') {
            return NextResponse.json(ApiError.fromError(400, 'Invalid row ID'), { status: 400 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(ApiError.fromError(401, unauthorized), { status: 401 });
        }

        const { data, error } = await supabase
            .from('rows')
            .select()
            .eq('id', id);

        if (error) {
            return NextResponse.json(ApiError.fromError(500, error.message), { status: 500 });
        }

        const foundRow = data?.[0];
        if (!foundRow) {
            return NextResponse.json(ApiError.fromError(404));
        }

        return NextResponse.json(foundRow, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json(ApiError.fromError(500, nextworkMessage), { status: 500 });
    }
}