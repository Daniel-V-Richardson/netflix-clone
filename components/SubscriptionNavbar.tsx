import React from 'react'
import Link from "next/link"
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react';


const SubscriptionNavbar = () => {

    const { data: currentUser = [] } = useCurrentUser();
    return (
        <div className='m-0 p-5 h-[10%] flex justify-between bg-black w-full fixed z-40 mb-32'>
            <Link href="/" className='flex w-52 lg:pl-12'>
                <img src="/images/logo.png" alt="logo" />
            </Link>
            {currentUser ? (
                <div className='flex justify-end mt-auto mb-auto gap-2'>
                   <div className='items-center w-[6%] overflow-hidden rounded-full mt-auto mb-auto'>
                   <img className='object-cover' src={currentUser?.emailVerified==null ? currentUser?.image : "/images/default-blue.png"} alt="" />
                   </div>
                    <p className='text-white font-bold lg:text-[1rem] text-center justify-center mt-auto mb-auto'>{currentUser?.name}</p>
                    <div onClick={() => signOut()} className='hover:underline cursor-pointer text-black ml-4 mt-auto mb-auto font-semibold lg:text-[1rem] p-2 rounded-lg bg-white'>
                        Sign Out
                    </div>
                </div>
            ) : (
            <Link href="/" className='text-white font-bold text-[1.5rem]'>
                Sign In
            </Link>
            )}

        </div>
    )
}

export default SubscriptionNavbar