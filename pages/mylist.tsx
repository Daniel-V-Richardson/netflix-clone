import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import React from 'react'
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';


const MyList = (props:any) => {
    const { data: favorites = [] } = useFavorites();
    const { isOpen, closeModal } = useInfoModalStore(); 
    return (
        <div>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <div className='flex flex-col gap-12 w-full h-full pt-16 pl-14 pr-14'>
                <h1 className='mt-16 font-black  text-white text-4xl'>
                    My List
                </h1>
                <MovieList title="" data={favorites} />
            </div>
        </div>
    )
}

export default MyList