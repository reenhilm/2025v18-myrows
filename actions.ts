"use server";
import { nextworkMessage, unauthorized } from "./constants";
import ApiError from "./classes/api-error";
import { Row } from "./interfaces/rows";
import { createClient } from "./utils/supabase/server";

export const fetchRowById = async (rowId: string): Promise<Row | ApiError> => {
    try {
        console.log("fetchRowById started");
        const supabase = await createClient();
    
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.error('User not authenticated');
            ApiError.fromError(500, unauthorized);
        }
        const { data, error } = await supabase
            .from('rows')
            .select()
            .eq('id', rowId);

        console.log(data, error);
        
        if (error) {
            if (error.code === '404')
                return ApiError.fromError(404);

            console.error('Error fetching row:', error);
            throw ApiError.fromError(500, `Backend returned, Code:${error.code} Message:${error.message} (see console.error logs for more details)`);
        }

        //This find should not be needed since supabase has .eq('id', rowId) already done for us
        const dataArr: Row[] = data;
        const foundRow: Row | undefined = dataArr.find(r => r.id.toString() === rowId);
        if (foundRow === undefined)
            return ApiError.fromError(404);
        
        return foundRow;

    } catch {
        //catching all errors, we don't want to show all internal error-messages to client so providing general error to client
        return ApiError.fromError(500, nextworkMessage);
    }
};

export const fetchRowsByText = async (text: string): Promise<Row[] | ApiError> => {
    try {
        console.log("fetchRowsByText started");
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.error('User not authenticated');
            ApiError.fromError(500, unauthorized);
        }
        const { data, error } = await supabase
            .from('rows')
            .select();
        
        console.log(data, error);

        if (error) {
            if (error.code === '404')
                return ApiError.fromError(404);

            console.error('Error fetching rows:', error);
            throw ApiError.fromError(500, `Backend returned, Code:${error.code} Message:${error.message} (see console.error logs for more details)`);
        }

        const dataArr: Row[] = data;
        const foundRows: Row[] = dataArr.filter(r => {
            const textUpper = text.toUpperCase();

            return r.text.toUpperCase().includes(textUpper);
        });
        return foundRows;

    } catch {
        //catching all errors, we don't want to show all internal error-messages to client so providing general error to client
        return ApiError.fromError(500, nextworkMessage);
    }
};