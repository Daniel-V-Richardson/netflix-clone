import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, onClick }) => {
  return (
    <div
      className={active ? 'text-white font-black cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'} onClick={onClick}>
      {label}

    </div>
  )
}

export default NavbarItem;
