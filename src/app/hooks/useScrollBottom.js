import { useState, useEffect } from "react";

const useScrollBottom = () => {
  const [isBottom, setBottom] = useState(false);

  useEffect(() => {
    const condition = (curH,winH) => curH - winH < 30;
    const handleScrollEvent = (e)=>{
        let curH = e.target.documentElement.getBoundingClientRect().bottom;
        let winH = window.innerHeight;
        setBottom(condition(curH,winH))
    }
    window.addEventListener("scroll",handleScrollEvent);
    return ()=>{
        window.removeEventListener("scroll",handleScrollEvent);
    }
  }, []);

  return { isBottom };
}

export default useScrollBottom;