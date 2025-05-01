import { login } from './actions'
export default function LoginPage() {
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <button formAction={login}>Log in</button>
            </form>
        </main>
    )
}