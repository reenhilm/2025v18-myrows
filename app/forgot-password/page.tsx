import ForgotForm from "./forgot-form";

export default function ForgotPassword() {    

    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center">
            <p>Skicka glömt lösenordsidan</p>
            <ForgotForm />
        </main>
    )
}