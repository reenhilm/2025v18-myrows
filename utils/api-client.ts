import ApiError from "@/classes/api-error";
import { Row } from '@/interfaces/rows'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function createRowViaApi(text: string): Promise<number | ApiError> {
    try {
        const res = await fetch(`${baseUrl}/api/rows/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const result = await res.json();

        if (!res.ok) {
            if (result) {
                if (result.show404)
                    return ApiError.fromError(404);

                if (result.message) {
                    return ApiError.fromError(
                        res.status,
                        result.message
                    );
                }
            }

            // Fallback if API didn't return structured error
            return ApiError.fromError(res.status, 'Unexpected error');
        }

        return result.id;
    } catch (err) {
        console.error(err);
        return ApiError.fromError(500, "Network or unexpected error");
    }
}

export async function findRowsViaApi(text: string): Promise<Row[] | ApiError> {
    try {
        const res = await fetch(`${baseUrl}/api/rows/find`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const result = await res.json();

        if (!res.ok) {
            if (result) {
                if (result.show404)
                    return ApiError.fromError(404);

                if (result.message) {
                    return ApiError.fromError(
                        res.status,
                        result.message
                    );
                }
            }

            // Fallback if API didn't return structured error
            return ApiError.fromError(res.status, 'Unexpected error');
        }

        return result as Row[];
    } catch (err) {
        console.error(err);
        return ApiError.fromError(500, 'Unexpected error during search');
    }
}

// This is called by server component!
export async function fetchRowViaApiWithCookies(id: string, cookieHeader: string): Promise<Row | ApiError> {

    //credentials: 'include' is not enough since we will be calling another domain, we are using SSR and cookies are only included if it's the same domain
    //manually including cookies to next request using: cookieHeader
    //⚠️ But keep in mind: this is only safe on the server. Never do this in client components.

    try {
        const res = await fetch(`${baseUrl}/api/rows/get-by-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookieHeader
            },
            body: JSON.stringify({ id }),
            credentials: 'include'
        });

        const result = await res.json();

        if (!res.ok) {
            if (result) {
                if (result.show404)
                    return ApiError.fromError(404);

                if (result.message) {
                    return ApiError.fromError(
                        res.status,
                        result.message
                    );
                }
            }

            // Fallback if API didn't return structured error
            return ApiError.fromError(res.status, 'Unexpected error');
        }

        return result as Row;
    } catch (err) {
        console.error('fetchRowViaApi error:', err);
        return ApiError.fromError(500, 'Unexpected client-side error fetching row');
    }
}