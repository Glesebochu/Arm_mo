import React from 'react'
import { Separator } from '../ui/separator'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
function Footer() {
  return (
    <div className='max-w-[1200px] m-auto flex flex-col items-center justify-center'>
        <Separator className="mt-20 mb-10"/>
        <p className='font-k2d'>Copyright &copy; 2024 Armmo LLC. All right reserved. </p>
        <div className='flex my-4 text-2xl text-neutral-500 cursor-pointer'>
            <FaTwitter/>
            <FaLinkedin className='mx-6'/>
            <FaFacebook/>
        </div>
    </div>
  )
}

export default Footer