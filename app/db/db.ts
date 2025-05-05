import { createClient } from "@/utils/supabase/server";

interface row {
    text: string;
}

interface insertResponse
{
    success: boolean;
    error?: string;
}

export async function insertRows(row: row): Promise<insertResponse> {
    // Gets the server client (auth-aware, schema='rowsapp')
    const supabase = await createClient();

    const { error } = await supabase
        .from('rows')
        .insert({ text: row.text });
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error('User not authenticated');
        return { success: false, error: 'User not authenticated' };
    }
    
    if (error) {
        console.error('Error inserting row:', error);

        // TODO is this safe to return or could it contain something clients should not see?
        return { success: false, error: `Backend returned, Code:${error.code} Message:${error.message} (see console.error logs for more details)`};
    }

    return { success:true };
}