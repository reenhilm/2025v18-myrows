'use client';
import { useState, useEffect } from 'react';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
} from '@/components/ui/command';
import { Row } from '@/interfaces/rows';
import ApiError from '@/classes/api-error';
import { isApiError } from '@/utils/type-guards';
import { findRowsViaApi } from '@/utils/api-client';
import Link from 'next/link';

export default function FindPage() {
    const [inputValue, setInputValue] = useState('');
    const [rows, setRows] = useState<Row[] | ApiError>([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue.length >= 3) {
                findRowsViaApi(inputValue).then((result) => {
                    setRows(result);
                    setHasSearched(true);
                });
            } else {
                setRows([]);
                setHasSearched(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [inputValue]);

    const showResults = !isApiError(rows) && rows.length > 0;

    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center  gap-15">
            <div className="max-w-lg w-full mt-10">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Search rows..."
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <CommandList>
                        {showResults ? (
                            rows.map((r) => (
                                <CommandItem key={r.id} className="flex flex-col items-start">
                                    <Link
                                     href={`./rows/${r.id}`}>
                                    <span className="font-medium block">{r.id}</span>
                                    <span className="text-sm text-muted-foreground block">{r.text}</span>
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