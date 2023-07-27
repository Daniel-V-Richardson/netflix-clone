import useSwr from 'swr'

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
  const { data: currentUser, error, isLoading, mutate } = useSwr('/api/current', fetcher);


  console.log('currentUser:', currentUser);

  return {
    data: currentUser,
    error,
    isLoading,
    mutate,
  }
};

export default useCurrentUser;
