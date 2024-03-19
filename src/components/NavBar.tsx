import React, { useEffect } from 'react';
import Icon from '@/assets/image.svg'
import { Link, useNavigate } from 'react-router-dom';
import DropDown from '@/components/navbar/DropDown';
import useAxios from 'axios-hooks';

interface NabBarProps {
  children: React.ReactNode;
}

const Navbar = ({children}:NabBarProps) => {
  const areAllChildrenListItems = React.Children.toArray(children).every(
    (child) => React.isValidElement(child) && child.type === 'li'
  );
  // Si no son todas etiquetas <li>, lanzar un error
  if (!areAllChildrenListItems) {
    throw new Error('Dropdown children must be <li> elements');
  }
  const Navigate = useNavigate()
  const [{error}, send] = useAxios({
      url: "http://137.184.85.23:8080/api/logout",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },{manual: true})

  useEffect(() => {
    if(error){
      console.error("Error al cerrar sesion", error.response?.data.errors)
    }
  }, [error])

  return (
    <nav className="bg-gray-400 border-gray-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Icon} className="h-10" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Mi aplicación
          </span>
        </Link>
        <DropDown>
          <li>
              <button
                onClick={() => {
                  send().then((res) => {
                    if(res.status === 200){
                      localStorage.removeItem('token')
                      Navigate('/login')
                    }
                  })
                }} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-start">
                Cerrar Sesion
              </button>
          </li>
        </DropDown>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lgmd:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 gap-5  dark:border-gray-700">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
