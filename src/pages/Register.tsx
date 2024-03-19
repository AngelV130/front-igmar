import Form from "@/components/Form"
import Input from "@/components/form/Input"
import ReCaptCha from "@/components/form/ReCaptCha"
import { useAuth } from "@/contexts/Sesion"
import useAxios from "axios-hooks"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Register() {
    const [alert, setAlert] = useState(false)
    const {user, loading, verifyToken} = useAuth()
    const Navigate = useNavigate()
    const [data, setData] = useState({email: "", password: "",pasword_confirmation: "", name: ""})
    const [captcha, setCaptcha] = useState("")
    const [{data:response, error}, send] = useAxios({
        url: "http://137.184.85.23:8080/api/register",
        method: "POST",
        data: {
            ...data,
            captchaResponse: captcha
        }
    },
    {
        manual: true
    })
    useEffect(() => {
        verifyToken()
    },[])
    useEffect(() => {
        !loading && user && Navigate('/')
    }, [user])
    useEffect(() => {
        error && console.error("Error al iniciar sesión", error.response?.data.errors)
        console.log("Usuario logueado", response)
        if(response){
            if(response.status === 403) {
                console.log("Error al iniciar sesión", error?.response?.data.errors)
            }else if(response.status === 200){
                setAlert(true)
                setTimeout(() => {
                    Navigate("/login")
                }, 2000)
            }
        }
    }, [error,response])

    const onSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        send()
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    return (
        <>
        {
            alert && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 absolute right-3 top-5
                    border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 
                    dark:border-green-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Registro Exitoso.</span> 
                        <p className="text-zinc-300">
                            Activa tu cuenta desde el correo que te enviamos.
                        </p>
                    </div>
                </div>
            )
        }
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Form
                        captcha={false}
                        disabled={alert}
                        link={{
                            to: "login",
                            tite: "¿Ya tienes una cuenta?",
                            text: "Iniciar Sesión"
                        }}
                        onSubmit={onSubmit}
                        submitText="Registrarse"
                        title="Registrate">
                        <Input
                        text="Nombre"
                        type="text"
                        placeholder="Nombre Completo"
                        name="name"
                        onChange={onChange}
                        error={error?.response?.data?.errors?.name}
                        />
                        <Input
                        text="Correo Electrónico"
                        type="email"
                        placeholder="example@email.com"
                        name="email"
                        onChange={onChange}
                        error={error?.response?.data?.errors?.email}
                        />
                        <Input
                        text="Contraseña"
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={onChange}
                        />
                        <Input
                        text="Repetir Contraseña"
                        type="password"
                        placeholder="password_confirmation"
                        name="password_confirmation"
                        onChange={onChange}
                        error={error?.response?.data?.errors?.password}
                        />
                        <div>
                            <ReCaptCha 
                            setToken={setCaptcha}
                            error={error}
                            />
                        </div>
                        <div>
                            {
                                error?.response?.data?.message && (
                                    <p className="text-red-500 text-xs italic mt-2">
                                        {error?.response?.data?.message}
                                    </p>
                                )
                            }
                            {
                                response?.message && response.status === 200 && (
                                    <p className="text-green-500 text-xs italic mt-2">
                                        {response?.message}
                                    </p>
                                )
                            }
                        </div>
                    </Form>
                </div>
            </section>
        </>
    )
}