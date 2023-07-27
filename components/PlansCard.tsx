import React, { CSSProperties, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Style } from 'util';

export interface PlansCardProps {
    title: string,
    subtitle: string,
    price: string,
    resolution: string,
    color: string,
    videoQuality: string,
    gradient?: CSSProperties,
    supportedDevices: string,
    isExpand: boolean;
}

const PlansCard: React.FC<PlansCardProps> = (
    {
        title,
        subtitle,
        price,
        resolution,
        color,
        gradient,
        videoQuality,
        supportedDevices,
        isExpand
    }) => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleClick = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
    };
    return (
        <div className={`flex flex-col rounded-[20px] border-white border-[1px] p-3 w-[300px] h-[500px] mt-14 ml-4 cursor-pointer ${isExpanded ? 'scale-105 transition-transform duration-[0.3s] ease-in-out ' : 'transition-transform duration-[0.3s] ease-in-out '
            }`}
            onClick={handleClick}>
            <div className='flex flex-col p-10 rounded-lg' style={gradient}>
                <span className='font-black text-white text-2xl'>{title}</span>
                <span className='font-black text-gray-400 text-[1.2rem]'>{subtitle}</span>
            </div>
            <div className='mt-4 flex flex-col'>
                <div className='flex gap-3 pl-3 mb-2'>
                    <CheckCircleIcon className='w-7' color={color} />
                    <div className='flex flex-col'>
                        <span className='text-zinc-200'>Monthly Price</span>
                        <span className='font-black text-white'>{price}</span>
                    </div>
                </div>
                <hr className="mb-2 w-[95%] m-auto" />
                <div className='flex gap-3 pl-3 mb-2'>
                    <CheckCircleIcon className='w-7' color={color} />
                    <div className='flex flex-col'>
                        <span className='text-zinc-200'>Resolution</span>
                        <span className='font-black text-white'>{resolution}</span>
                    </div>
                </div>
                <hr className="mb-2 w-[95%] m-auto" />
                <div className='flex gap-3 pl-3 mb-2'>
                    <CheckCircleIcon className='w-7' color={color} />
                    <div className='flex flex-col'>
                        <span className='text-zinc-200'>Video quality</span>
                        <span className='font-black text-white'>{videoQuality}</span>
                    </div>
                </div>
                <hr className="mb-2 w-[95%] m-auto" />
                <div className='flex gap-3 pl-3 mb-2'>
                    <CheckCircleIcon className='w-7' color={color} />
                    <div className='flex flex-col'>
                        <span className='text-zinc-200'>Supported devices</span>
                        <span className='font-black text-white'>{supportedDevices}</span>
                    </div>
                </div>
                {isExpand ? (
                    <div className='flex text-center items-center justify-center mt-3 text-white font-bold'>
                        <CheckCircleIcon className='w-7' color='white' />
                        Selected
                    </div>
                ) : (
                    <></>
                )}

            </div>
        </div>
    );
};

export default PlansCard;
