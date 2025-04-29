import ApiError from "@/classes/api-error";

export const isApiError = (obj: unknown): obj is ApiError => {
    return typeof obj === 'object' && obj !== null && 'statusCode' in obj;
};