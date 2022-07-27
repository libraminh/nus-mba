import { useEffect, useMemo, useRef, useState } from 'react';

export const useFloatingNav = () => {
  const [isOverNav, setIsOverNav] = useState(false);
  const isScrolling = useRef(null);
  const isFloated = useRef(false);
  const scrollTop = useRef(0);
  const floatingNav = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted) return;
    const onScroll = () => {
      scrollTop.current = window.scrollY;
      isFloated.current = true;

      if (scrollTop.current > 100) {
        setIsOverNav(true);
      } else {
        setIsOverNav(false);
      }

      if (isScrolling.current !== null) {
        window.clearTimeout(isScrolling.current);
      }

      isScrolling.current = setTimeout(() => {
        setIsOverNav(false);
      }, 2000);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollTop.current, isMounted.current]);

  const floatingNavClasses = useMemo(() => {
    let navClasses =
      'fixed bg-white top-0 left-0 w-full py-5 md:py-10 px-5 md:px-7 shadow-lg z-[200] transform -translate-y-full';

    if (isOverNav) {
      navClasses += ' animation-floating-nav';
    }
    if (!isOverNav && isFloated.current) {
      navClasses += ' animation-floating-end';
    }

    return navClasses;
  }, [isOverNav, isFloated.current]);

  return {
    floatingNavClasses,
    floatingNav,
  };
};
