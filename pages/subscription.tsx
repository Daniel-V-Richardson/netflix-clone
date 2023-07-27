import React, { useState, useEffect } from 'react';
import SubscriptionNavbar from '@/components/SubscriptionNavbar';
import PlansCard from "@/components/PlansCard"
import useSubscription from '@/hooks/useSubscription';
import { motion } from 'framer-motion';
import { CheckCircleIcon, CheckIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/solid'
import { IoPhonePortraitOutline } from "react-icons/io5"
import PlansCardWrapper from '@/components/PlansCardWrapper';


const SubscriptionStep1 = () => (
    <div className='flex gap-2 pl-[20%] pr-[20%]  items-center relative pt-20'>
        <div className='flex flex-col items-center justify-center m-auto'>
            <CheckCircleIcon color='red' className='flex w-24 mt-11 overflow-hidden' />

            <h2 className='text-gray-300 mt-7'>STEP <b>1</b> OF <b>3</b></h2>
            <h1 className='text-white font-black justify-center items-center text-4xl'>Choose your Plan.</h1>
            <div className='flex flex-col'>
                <div className='flex items-center text-white mt-10 font-semiBold text-[1.5rem]'>
                    <CheckIcon color='red' className='w-10' />
                    No commitments, cancel anytime.
                </div>
                <div className='flex items-center text-white mt-10 font-semiBold text-[1.5rem]'>
                    <CheckIcon color='red' className='w-10' />
                    Everything on Netflix for one low price.
                </div>
                <div className='flex items-center text-white mt-10 font-semiBold text-[1.5rem]'>
                    <CheckIcon color='red' className='w-10' />
                    No ads and no extra fees. Ever.
                </div>
            </div>

        </div>
    </div>
);
const cards = [
    {
        title: 'Premium',
        subtitle: '4K + HDR',
        price: '$15.99',
        resolution: '4K (Ultra HD) + HDR',
        color: 'red',
        videoQuality: 'Best',
        supportedDevices: 'TV, computer, mobile phone, tablet',
        gradient: {
            background: 'linear-gradient(135deg, #1f4f9d, #3f3b91, #423b8f, #c6132c)',
        },
        isExpand: false,

    },
    {
        title: "Standard",
        subtitle: "1080p",
        price: "$499",
        color: '#8a3bc8',
        resolution: "1080p (Full HD)",
        videoQuality: "Better",
        supportedDevices: "TV, computer, mobile phone, tablet",
        gradient: {
            background: 'linear-gradient(135deg, #1f4f9d, #3f3b91, #423b8f,#8a3bc8)',
        },
        isExpand: false,
    },
    {
        title: "Basic",
        subtitle: "720p",
        price: "$199",
        color: '#5d3cce',
        resolution: "720p (HD)",
        videoQuality: "Good",
        supportedDevices: "TV, computer, mobile phone, tablet",
        gradient: {
            background: 'linear-gradient(135deg, #1f4f9d, #3f3b91, #423b8f, #5d3cce)',
        },
        isExpand: false,
    },
    {
        title: "Mobile",
        subtitle: "480p",
        price: "$149",
        color: '#2172e3',
        resolution: "4K (Ultra HD) + HDR",
        videoQuality: "Good",
        supportedDevices: "Mobile phone, tablet",
        gradient: {
            background: 'linear-gradient(135deg, #1f4f9d, #3f3b91, #423b8f, #5d3cce)',
        },
        isExpand: false,
    }
]
const SubscriptionStep2 = () => (
    <div className='flex gap-2 pl-[10%] relative pt-20'>
        <div className='flex flex-col items-start justify-start'>
            <h2 className='text-gray-300 mt-7'>STEP <b>2</b> OF <b>3</b></h2>
            <h1 className='text-white font-black justify-center items-center text-4xl'>Choose your Plan that&#39;s right for you.</h1>
            <div className='flex'>
                <PlansCardWrapper cards={cards} />
            </div>
            <span className='mt-14 text-white font-semibold pl-6 pr-6'>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
                Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
            </span>
        </div>
    </div>
);

const SubscriptionStep3 = () => (
    <div className='flex gap-2 relative pt-30'>
        <div className='flex flex-col items-center justify-center m-auto'>
            <div className='flex mt-40 items-end'>
                <IoPhonePortraitOutline size={92} color='red' />
                <IoPhonePortraitOutline size={52} color='red' />
            </div>
            <h2 className='text-gray-300 mt-7'>STEP <b>3</b> OF <b>3</b></h2>
            <h1 className='text-white font-black justify-center items-center text-4xl'>Finish setting up your account</h1>
            <span className='text-white mt-8 mb-7 pl-[30%] text-center text-lg pr-[30%]'>
                Netflix is personalised for you. Create a password to watch Netflix on your mobile phone or tablet.
            </span>

        </div>
    </div>
);



const Subscription = ( ) => {
    

    const { step, prevStep, handleNext, handlePrevious, handleFinish } = useSubscription();

    useEffect(() => {

        const handleBackButton = () => {
            if (step > 1) {
                handlePrevious();
            }
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [handlePrevious, step]);

    const containerVariants = {
        hidden: { opacity: 0, x: prevStep > step ? '-100%' : '100%' }, // Check if we are going back or forward
        visible: { opacity: 1, x: '0%' },
        exit: { opacity: 0, x: prevStep > step ? '100%' : '-100%' }, // Check if we are going back or forward
    };
    return (
        <div className='mb-32'>
            <SubscriptionNavbar />

            <motion.div
                key={step}
                className="subscription-step"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 0.5 }}
            >
                {step === 1 && <SubscriptionStep1 />}
                {step === 2 && <SubscriptionStep2 />}
                {step === 3 && <SubscriptionStep3 />}
            </motion.div>


            {step < 3 && (
                <button
                    className='p-4 text-white text-2xl w-[25%] mt-4 rounded-md bg-[#f6121d] font-black items-center m-auto justify-center flex'
                    onClick={handleNext}
                >
                    {step === 1 ? 'Next' : 'Next'}

                </button>
            )}

            {step === 3 && <button className='p-4 text-white text-2xl w-[25%] mt-4 rounded-md bg-[#f6121d] font-black items-center m-auto justify-center flex' onClick={handleFinish}>Finish</button>}
        </div>
    );
};

export default Subscription;
