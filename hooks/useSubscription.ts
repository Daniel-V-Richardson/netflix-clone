import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import useCurrentUser from './useCurrentUser';

const useSubscription = () => {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(0);
  const router = useRouter();
  const { data: currentUser, error, isLoading, mutate } = useCurrentUser(); // Get the data and mutate function from the useCurrentUser hook

  const handleNext = () => {
    setPrevStep(step);
    setStep((prevStep) => prevStep + 1);
    window.history.pushState({ step: step + 1 }, '', `${window.location.pathname}?step=${step + 1}`);
  };

  const handlePrevious = () => {
    setPrevStep(step);
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      window.history.pushState({ step: step - 1 }, '', `${window.location.pathname}?step=${step - 1}`);
    }
  };

  const handleFinish = async () => {
    try {
      if (currentUser && !currentUser.isSubscribed) {
        const updatedUserData = { ...currentUser, isSubscribed: true };
  
        await fetch('/api/updateSubscriptionStatus', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUserData), // Pass the updatedUserData in the request body
        });
  
        alert('Successfully Subscribed!');
      } else {
        alert('Already Subscribed!');
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    const handleBackButton = (e:any) => {
      e.preventDefault();
      handlePrevious();
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [handlePrevious]);

  return { step, prevStep, isLoading, handleNext, handleFinish, handlePrevious };
};

export default useSubscription;
