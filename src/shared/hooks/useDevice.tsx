import { useState, useEffect } from "react";

export const useDevice = () => {
  const MOBILE_MAX_WIDTH = 768;
  const TABLET_MAX_WIDTH = 1024;

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;

      setIsMobile(width <= MOBILE_MAX_WIDTH);
      setIsTablet(width > MOBILE_MAX_WIDTH && width <= TABLET_MAX_WIDTH);
      setIsDesktop(width > TABLET_MAX_WIDTH);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};
