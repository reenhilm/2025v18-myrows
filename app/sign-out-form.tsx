'use client'
import { Button } from "@/components/ui/button";
import { isApiError } from "@/utils/type-guards";
import { logout } from '@/utils/api-client';
import { toast } from "sonner"

export default function SignOutForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await logout();

        if (isApiError(result)) {
            toast.error("Error", { description: result.message });
        }
        else {
            window.location.href = '/';
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" variant={"outline"}>
                Sign out
            </Button>
        </form>
    )
}