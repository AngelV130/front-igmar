import { useEffect, useState } from "react";

interface ReCaptChaProps {
    setToken: (token: string) => void;
    error: any;
}

export default function ReCaptCha({setToken, error}: ReCaptChaProps) {
    const [state, setState] = useState(false)
    const [opt_widget_id , setw] = useState(null)
    useEffect(() => {
        const loadRecaptchaScript = () => {
          const script = document.createElement('script');
          script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
          script.async = true;
          document.head.appendChild(script);
    
          script.onload = () => {
              setState(true)
          };
        };
    
        loadRecaptchaScript();
      }, []);
    
      useEffect(()=>{
        if(state){
          window.grecaptcha.ready(() => {
            opt_widget_id != null && grecaptcha.reset(opt_widget_id)
            setw(
              (window as any).grecaptcha.render('contenedor-recaptcha', {
                sitekey: '6LdQ7F0pAAAAAMb2vICxr89p1srjijesx1HKl73A',
                callback: (response: any) => {
                  setToken(response)
                },
              })
            )
          })
        }
      },[error,state])
    
      return (
        <>
          <div id="contenedor-recaptcha" className="g-recaptcha"></div>

            {
                error?.response?.data?.errors?.captchaResponse && (
                    error?.response?.data?.errors?.captchaResponse.map((err: string, index: number) => (
                        <p key={err + index} className="text-red-500 text-xs italic mt-2">
                            {err}
                        </p>
                    ))
                )
            }
        </>
      );
}