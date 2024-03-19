import Imagen from "@/assets/image.png"
import { useAuth } from "@/contexts/Sesion"


export default function Home() {
    const { user } = useAuth();
    return (
        <>
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                    <div>
                                        <h1 className="text-4xl font-bold text-white mb-2">
                                            Bienvenido: 
                                        </h1>
                                        <p className="text-2xl text-gray-500 dark:text-gray-400">
                                            <strong className="font-bold text-zinc-300">
                                                {user?.name}
                                            </strong> eres un: 
                                            <strong className="font-bold text-zinc-300">
                                                {user?.rol}
                                            </strong>
                                        </p>
                                    </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Best practices for successful prototypes</h1>
                        </header>
                        <p className="lead">Flowbite is an open-source library of UI components built with the utility-first
                            classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals,
                            datepickers.</p>
                        <p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
                            you can think things through before committing to an actual design project.</p>
                        <p>But then I found a <a href="https://flowbite.com">component library based on Tailwind CSS called
                                Flowbite</a>. It comes with the most commonly used UI components, such as buttons, navigation
                            bars, cards, form elements, and more which are conveniently built with the utility classes from
                            Tailwind CSS.</p>
                        <figure className="m-3">
                            <img src={Imagen} alt=""/>
                            <figcaption className="text-center">Digital art by Anonymous</figcaption>
                        </figure>
                    </article>
                </div>
        </>
    )
}