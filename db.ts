import insertResponse from "@/interfaces/db-response";
import { createClient } from "@/utils/supabase/server";

interface row {
    text: string;
}

export async function insertRows(row: row): Promise<insertResponse> {
    // Gets the server client (auth-aware, schema='rowsapp')
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error('User not authenticated');
        return { success: false, errorMessage: 'User not authenticated' };
    }

    const { error } = await supabase
        .from('rows')
        .insert({ text: row.text });
    
    if (error) {
        console.error('Error inserting row:', error);
        return { success: false, errorMessage: `Backend returned, Code:${error.code} Message:${error.message} (see console.error logs for more details)`};
    }
    return { success:true };
}