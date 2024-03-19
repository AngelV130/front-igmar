import { Link } from "react-router-dom"
import Icon from "@/assets/image.svg";


interface FormProps {
    title: string
    children: React.ReactNode
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    submitText: string
    link: {
        to: string
        tite: string
        text: string
    }
    disabled: boolean
    captcha: boolean
}

export default function Form({
    title,
    children,
    onSubmit,
    submitText,
    link,
    disabled,
    captcha
}: FormProps) {
    return (
        <>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 relative flex flex-col">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {title}
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>

                        <div className="absolute flex items-center justify-center border border-white rounded-full overflow-hidden top-[-4.6rem] right-[11rem] bg-opacity-70 bg-white">
                            <img src={Icon} alt="" className="w-28 h-28" />
                        </div>
                        {children}
                        {
                            captcha && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        CaptCha
                                    </div>
                                </div>
                            )
                        }
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border" disabled={disabled}>{submitText}</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            {link.tite}
                            <Link to={"/"+link.to} className="font-medium text-primary-600 hover:text-blue-400 dark:text-primary-500 m-2 underline">{link.text}</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}