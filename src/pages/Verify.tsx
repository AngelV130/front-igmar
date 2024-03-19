import Form from "@/components/Form";
import Input from "@/components/form/Input";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";



export default function Verify() {
    const Navigate = useNavigate()
    const query = useSearchParams()
    const {id} = useParams()
    const [code, setCode] = useState("")
    const [{data, error, loading}, send] = useAxios({
        url: `http://137.184.85.23:8080/api/verify/code/${id}?expires=${query[0].get('expires')}&signature=${query[0].get('signature')}`,
        method: "POST",
        data: {code}
    },
    {
        manual: true
    })
    useEffect(() => {
        if(error){
            console.error("Error al verificar el código", error.response?.data.errors)
            if(error.response?.status === 403){
                setTimeout(() => {
                    Navigate("/login")
                }, 2000)
            }
        }
        if(data){
            localStorage.setItem("token", data.data.token)
            Navigate("/")
        }
    }, [error, data])
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        send()
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value)
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Form
                        captcha={false}
                        disabled={loading}
                        link={{
                            to: "",
                            tite: "",
                            text: ""
                        }}
                        onSubmit={onSubmit}
                        submitText="Enviar"
                        title="Codigo de Verificación">
                        <Input
                        text="Correo Electrónico"
                        type="text"
                        placeholder="1234"
                        name="code"
                        onChange={onChange}
                        error={error?.response?.data?.errors?.code}
                        />
                        {
                            error?.response?.data?.message && (
                                <p className="text-red-500 text-xs italic mt-2">
                                    {error?.response?.data?.message}
                                </p>
                            )
                        }
                    </Form>
                </div>
            </section>
        </>
    )
}