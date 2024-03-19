import React, { useEffect, useRef } from 'react';
import Icon from '@/assets/image.svg';
import { useAuth } from '@/contexts/Sesion';

interface DropDownProps {
    children: React.ReactNode;
}

export default function DropDown({children}: DropDownProps) {
    const areAllChildrenListItems = React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === 'li'
      );
      // Si no son todas etiquetas <li>, lanzar un error
      if (!areAllChildrenListItems) {
        throw new Error('Dropdown children must be <li> elements');
      }
    const refDropdown = useRef<HTMLDivElement>(null);
    const {user} = useAuth()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (refDropdown.current && !refDropdown.current.contains(event.target as Node)) {
            refDropdown.current.classList.add('hidden');
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reversen relative">
                <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => {
                    if (refDropdown.current) {
                    refDropdown.current.classList.toggle('hidden');
                    }
                }}
                >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={Icon} alt="user photo"/>
                </button>
                <div ref={refDropdown} 
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-[50%] right-0"
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                            {user?.name}
                        </span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                            {user?.email}
                        </span>
                    </div>
                    <ul className="py-2">
                        {children}
                    </ul>
                </div>
            </div>
        </>
    )
}