import React from 'react'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import useMovieList from '@/hooks/useMovieList';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import MovieListHorizontal from '@/components/MovieListHorizontal';

const Newpopular = () => {
    const { data: movies = [] } = useMovieList();
    const { isOpen, closeModal } = useInfoModalStore();
    return (
        <div>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <div className='flex flex-col gap-12 w-full h-full pt-16 pl-14 pr-14'>
                <h1 className='mt-16 font-black  text-white text-4xl'>
                </h1>
                <MovieListHorizontal title="New on Netflix" data={movies} />
                <MovieListHorizontal title="Top 10 TV Shows in India Today" data={movies} />
                <MovieListHorizontal title="Top 10 Movies in India Today" data={movies} />
            </div>
        </div>
    )
}

export default Newpopular