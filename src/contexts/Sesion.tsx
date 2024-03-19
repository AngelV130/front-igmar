import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "axios-hooks";


const SesionContext = createContext<SesionContextType>({
    user: null,
    verifyToken: () => {},
    loading: false,
});
    

const SesionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [{data, loading, error}, executeRequest] = useAxios({
        url: "http://137.184.85.23:8080/api/perfil",
        method: "GET",
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
    }, {manual: true,useCache: false});

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
    if (error) {
        console.log(data)
        data == null ? setUser(data) : setUser(null);
    }
  }, [data, error]);

  return (
    <SesionContext.Provider value={{ user, verifyToken:()=>{executeRequest()}, loading }}>
      {children}
    </SesionContext.Provider>
  );
}

const useAuth = () => useContext(SesionContext);

export { useAuth, SesionProvider };