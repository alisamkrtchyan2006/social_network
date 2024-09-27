import React, { useEffect, useState } from 'react';
import { NavLinkPolyfillProps } from '../../../lib/types';

const NavLinkPolyfill: React.FC<NavLinkPolyfillProps> = ({ to, end = false, children, className = '', ...props }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      const currentPath = window.location.pathname;

      if (end) {
        setIsActive(currentPath === to);
      } else {
        setIsActive(currentPath.startsWith(to));
      }
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [to, end]);

  return (
    <a
      href={to}
      className={`${className} ${isActive ? 'active' : ''}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default NavLinkPolyfill;
