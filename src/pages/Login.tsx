import Input from "@/components/form/Input";
import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/Sesion";
import { useNavigate } from "react-router-dom";
import useAxios from "axios-hooks";
import ReCaptCha from "@/components/form/ReCaptCha";


export default function Login() {
    const {user, loading, verifyToken} = useAuth()
    const Navigate = useNavigate()
    const [data, setData] = useState({email: "", password: "",})
    const [captcha, setCaptcha] = useState("")
    const [{data:response, error}, send] = useAxios({
        url: "http://137.184.85.23:8080/api/login",
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
        !error && verifyToken()
    },[])
    useEffect(() => {
        !loading && user && Navigate('/')
    }, [user])
    useEffect(() => {
        if(error){
            console.error("Error al iniciar sesión", error.response?.data.errors)
            if(error.response?.status === 403) {
                Navigate(`/verify/${error.response?.data.user_id}?${error.response?.data.singurl}`)
            }
        }
        console.log("Usuario logueado", response)
        if(response){
            if(response.status === 200){
                localStorage.setItem("token", response.data.token)
                Navigate("/")
            }
        }
    }, [error,response])


    const onSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("Formulario enviado", data)
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
                loading ?
                    <div className="flex items-center justify-center h-screen">
                        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full loader"></div>
                    </div>
                    :
                    !user &&
                    (
                        <section className="bg-gray-50 dark:bg-gray-900">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <Form
                                    captcha={false}
                                    disabled={false}
                                    link={{
                                        to: "register",
                                        tite: "¿No tienes una cuenta?",
                                        text: "Regístrate"
                                    }}
                                    onSubmit={onSubmit}
                                    submitText="Iniciar Sesión"
                                    title="Iniciar Sesión">
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
                                    </div>
                                </Form>
                            </div>
                        </section>
                    )
            }
        </>
    )
}