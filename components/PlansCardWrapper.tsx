import React, { useState } from 'react';
import PlansCard, {PlansCardProps}  from './PlansCard'; // Import PlansCard and PlansCardProps from the same file

interface PlansCardWrapperProps {
  cards: PlansCardProps[];
}

const PlansCardWrapper: React.FC<PlansCardWrapperProps> = ({ cards }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
  };

  return (
    <div className="flex flex-wrap">
      {cards.map((card, index) => (
        <div
          key={index}
          className={selectedCardIndex === index ? 'scale-105 transition-transform duration-0.3 ease-in-out' : 'scale-100 transition-transform duration-0.3 ease-in-out'}
          onClick={() => handleCardClick(index)}
        >
          <PlansCard {...card} isExpand={selectedCardIndex === index} />
        </div>
      ))}
    </div>
  );
};

export default PlansCardWrapper;
