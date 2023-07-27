import React, { useCallback, useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import {useRouter} from "next/router"

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Link from "next/link"
import useCurrentUser from '@/hooks/useCurrentUser';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  const { data: currentUser = [] } = useCurrentUser();


  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <Link href="/"><img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" /></Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active={router.pathname === '/'} onClick={() => router.push('/')} />
          <NavbarItem label="Series" active={router.pathname === '/series'} onClick={() => { }} />
          <NavbarItem label="Films" active={router.pathname === '/films'} onClick={() => { }} />
          <NavbarItem label="New & Popular" active={router.pathname === '/newpopular'} onClick={() => router.push('/newpopular')} />
          <NavbarItem label="My List" active={router.pathname === '/mylist'} onClick={() => router.push('/mylist')} />
          <NavbarItem label="Browse by Languages" active={router.pathname === '/browse-languages'} onClick={() => { }} />
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          {currentUser?.isSubscribed ? (
            <></>
          ) : (
            <Link href="/subscription" className='text-white p-2.5 bg-[#000] rounded-full font-bold'>Subscribe to Netflix</Link>
          )}
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-6" />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img className='' src={currentUser?.emailVerified == null ? currentUser?.image : "/images/default-blue.png"} alt="" />
              {/* <img src={currentUser.image == "" ? currentUser.image : "/images/default-blue.png"} alt="" /> */}
            </div>
            <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
