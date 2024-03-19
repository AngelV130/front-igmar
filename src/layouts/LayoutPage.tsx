import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/Sesion';
import { useEffect } from 'react';


export default function LayoutPage() {
    const { user, loading, verifyToken} = useAuth();
    const Navigate = useNavigate();

    useEffect(() => {
        !loading && !user && Navigate('/login');
    }, [user]);
    useEffect(() => {
        verifyToken();
    },[]);

    return (
        <>
            {
                loading ?
                    <div className="flex items-center justify-center h-screen">
                        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full loader"></div>
                    </div>
                    :
                    user &&
                    <>
                        <NavBar>
                            <li className='element-with-active-class'>
                                <NavLink aria-activedescendant='active' to="/" className="block py-2 px-3  rounded md:bg-transparent  md:p-0  underline">Home</NavLink>
                            </li>
                            <li className='element-with-active-class'>
                                <NavLink aria-activedescendant='active' to="/perfil" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 underline">Perfil</NavLink>
                            </li>
                        </NavBar>
                        <main className='container mx-auto my-4 min-h-full'>
                            <Outlet />
                        </main>
                        <Footer />
                    </>
            }
        </>
    )
}