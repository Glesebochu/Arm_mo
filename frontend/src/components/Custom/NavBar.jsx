import { useEffect, useState } from 'react';

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
            <div className="bg-transparent flex justify-between items-center backdrop-bl px-4 py-4 max-w-[1400px] m-auto">
                <h1 className='font-bold font-k2d text-4xl'>
                    Arm&rsquo;mo
                </h1>
                <div className="flex">
                    <button className="font-k2d font-bold flex items-center px-8 py-1.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                        Login
                    </button>
                    {/* <Button className="font-delius font-bold px-8 text-[15px]">
                        Login
                    </Button> */}
                </div>
            </div>
        </div>
    );
}

export default NavBar;

