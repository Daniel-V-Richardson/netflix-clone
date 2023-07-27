import React from 'react';
import { NextPageContext, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useCurrentUser from "@/hooks/useCurrentUser";
import SubscribeFirst from "@/components/SubscribeFirst"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);


  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore(); 
  const { data: currentUser = [] } = useCurrentUser();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      {currentUser?.isSubscribed ?
        (
          <div className="pb-40">
            <MovieList title="Trending Now" data={movies} />
            <MovieList title="My List" data={favorites} />
          </div>
        )
        : (
          <div className="pb-40">
            <SubscribeFirst />
          </div>
        )}
      {/* <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div> */}
    </>
  )
}

export default Home;
