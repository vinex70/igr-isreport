import { Link } from 'react-router-dom';
import ListPga from './Store';
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-10 bg-blue-500 border-b border-gray-200">
            <div className="container mx-auto flex flex-wrap items-center justify-between p-3">
                {/* Logo (menggunakan Link) */}
                <Link to="/" className="flex items-center"> {/* Menggunakan Link */}
                    <img
                        src="/cpg-vite/igr.png"
                        alt="Logo"
                        className="w-fit h-12 rounded-sm"
                    />
                </Link>

                {/* Navigasi */}
                <div className='flex items-center space-x-4'>
                    <div>
                        <Button variant="ghost" className='text-white'>
                            <Link to="/">
                                Dashboard
                            </Link>
                        </Button>
                    </div>
                    <ListPga />
                    <div>
                        <Button variant="ghost" className='text-white'>
                            <Link to="/settingharga">
                                Setting Harga
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex-shrink-0 rounded-xl bg-white p-2">
                    <Link to="/sonas"
                        className="lg:text-xl md:text-lg text-sm font-bold text-gray-700 dark:text-white capitalize flex space-x-1
                        hover:underline hover:underline-offset-4 hover:text-blue-500"
                    >
                        Cek Sonas
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;