import { useEffect, useState } from 'react';
import { Button } from "../ui/button";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`bg-transparent sticky top-0 z-50 ${isScrolled ? 'backdrop-blur' : ''}`}>
            <div className="bg-transparent flex justify-between items-center backdrop-bl px-4 py-4 max-w-[1200px] m-auto font-k2d font-bold text-3xl">
                <h1>
                    Arm&rsquo;mo
                </h1>
                <div className="flex">
                    <Button className="font-delius font-bold px-8 text-xs">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
