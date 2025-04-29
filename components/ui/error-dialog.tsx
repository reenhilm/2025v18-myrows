"use client";
import React from "react";
import { Button } from "./button";

function onRetry() {
    window.location.reload();
}

export default function ErrorDialog({ message }: { message: string | null }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="rounded-2xl shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold">An Error Occurred</h2>

                <p className="mt-2">
                    {message || "Something went wrong. Please try again."}
                </p>

                <div className="mt-4 flex justify-end space-x-2">
                    <Button
                        className="px-7"
                        variant="outline"
                        size="icon"
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                </div>
            </div>
        </div>
    )
}