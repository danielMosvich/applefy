import { useState, useEffect } from 'react';

const useDeviceInfo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
    setIsIOS(/iPhone|iPad|iPod/i.test(userAgent));
    setIsAndroid(/Android/i.test(userAgent));
  }, []);

  return { isMobile, isIOS, isAndroid };
};

export default useDeviceInfo;
