import Image from "next/image";
import vincent from './public/images/vincent.gif';

export default function Custom404() {
    return (
        <main className="col-start-2 -col-end-2 flex flex-col items-center justify-center gap-5">
            <h1 className="text-[min(4.8vw,48px)] text-balance text-center">404</h1>
            <p className="text-[min(3.1vw,20px)] text-balance text-center">Requested Page Not Found</p>
            <Image className="rounded-md border w-full" src={vincent} alt="" width={480} height={270} />
        </main>
    );
}