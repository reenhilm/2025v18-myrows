import { Button } from '@/components/ui/button'
import { login } from './actions'
import { Input } from '@/components/ui/input'
export default function LoginPage() {
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <form className="flex flex-col md:flex-row gap-5">
                <Input id="email" name="email" type="email" required placeholder="email@email.com" aria-label="email" />
                <Input id="password" name="password" type="password" required aria-label="password" />
                <Button className='align-center' formAction={login}>Log in</Button>
            </form>
        </main>
    )
}