import { Link } from "react-router-dom";



export default function Footer() {
    return (
        <footer 
        className="bg-white shadow dark:bg-gray-800 absolute bottom-0 w-full m-0">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="/" className="hover:underline">Mi App</Link>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <p className="hover:underline cursor-pointer me-4 md:me-6">About</p>
                    </li>
                    <li>
                        <p className="hover:underline cursor-pointer me-4 md:me-6">Privacy Policy</p>
                    </li>
                    <li>
                        <p className="hover:underline cursor-pointer me-4 md:me-6">Licensing</p>
                    </li>
                    <li>
                        <p className="hover:underline cursor-pointer">Contact</p>
                    </li>
                </ul>
            </div>
        </footer>
    )
}