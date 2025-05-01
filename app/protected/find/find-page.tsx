'use client';
import { useState, useEffect } from 'react';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
} from '@/components/ui/command';
import { Receipt } from '@/interfaces/receipt';
import ApiError from '@/classes/api-error';
import { isApiError } from '@/utils/type-guards';
import { fetchReceiptsByText } from '@/actions';
import Link from 'next/link';

export default function FindPage() {
    const [inputValue, setInputValue] = useState('');
    const [receipts, setReceipts] = useState<Receipt[] | ApiError>([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue.length >= 3) {
                fetchReceiptsByText(inputValue, 2).then((result) => {
                    setReceipts(result);
                    setHasSearched(true);
                });
            } else {
                setReceipts([]);
                setHasSearched(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    const showResults = !isApiError(receipts) && receipts.length > 0;
    console.log("showresults:" + showResults);

    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center  gap-15">
            <div className="max-w-lg w-full mt-10">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Search receipts..."
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <CommandList>
                        {showResults ? (
                            receipts.map((r) => (
                                <CommandItem key={r.id} className="flex flex-col items-start">
                                    <Link
                                     href={`./receipts/${r.id}`}>
                                    <span className="font-medium block">{r.title}</span>
                                    <span className="text-sm text-muted-foreground block">{r.description}</span>
                                    </Link>
                                </CommandItem>
                            ))
                        ) : (
                            hasSearched ? <CommandEmpty>No results found.</CommandEmpty>
                            :
                            <CommandEmpty>At least 3 characters are required for your search term.</CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </div>
        </main>
    );
}