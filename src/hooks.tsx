import { useState, useEffect } from "react";

export const useResponsiveItemWidth = () => {
    const [itemWidth, setItemWidth] = useState(320);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      const handleMediaChange = () => {
        setItemWidth(mediaQuery.matches ? 352 : 320);
      };
  
      handleMediaChange();
      mediaQuery.addEventListener("change", handleMediaChange);
      return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);
  
    return itemWidth;
  };

