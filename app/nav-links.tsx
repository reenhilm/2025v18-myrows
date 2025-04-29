import Link from "next/link"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut
} from '@clerk/nextjs'

export default function NavLinks() {
    return (
        <>
            <SignedIn>
                <Link href="/find" className="mx-1 py-1 px-3 font-semibold uppercase hover:underline visually-hidden">FIND</Link>
                <Link href="/add" className="mx-1 py-1 px-3 font-semibold uppercase hover:underline visually-hidden">ADD</Link>
            </SignedIn >
            <SignedOut>
            <div className="mx-1 py-1 px-3 whitespace-nowrap *:uppercase *:font-semibold *:cursor-pointer *:hover:underline">
                <SignInButton />
            </div>
            <div className="mx-1 py-1 px-3 whitespace-nowrap *:uppercase *:font-semibold *:cursor-pointer *:hover:underline">
                <SignUpButton />
            </div>
            </SignedOut>

        </>
    )
}