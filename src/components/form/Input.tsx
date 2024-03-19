import { useId } from "react"

interface InputProps {
    text: string
    type: string
    placeholder: string
    name: string
    error?: string[]
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
    text= "",
    type= "text",
    placeholder= "",
    name= "",
    error = [],
    onChange
}: InputProps) {
    const id = useId()

    return (
        <>
            <div>
                <label htmlFor={id} 
                className={`
                    block mb-2 text-sm font-medium text-gray-900 dark:text-white
                    ${error ? 'border-red-500' : ''}
                `}>   
                    {text}
                </label>
                <input onChange={onChange}
                 type={type} name={name} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
                {
                    error && error.map((err, index) => (
                        <p key={err+index} className="text-red-500 text-xs italic mt-2">{err}</p>
                    ))
                }
            </div>
        </>
    )
}