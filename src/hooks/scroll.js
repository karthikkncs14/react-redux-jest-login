import { useEffect, useState } from 'react'

const Scroll = (callback) => {
    const [isFetchScroll, setIsFetching] = useState(false);
    const [atBottom,setBottom] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetchScroll) return;
        callback(() => {
            console.log('called back');
        });
    }, [isFetchScroll]);

    useEffect(()=>{
        if(atBottom) {
            setIsFetching(true);
        }
    },[atBottom])


    function handleScroll(event) {
        console.log("scrolled");
        const element = document.getElementById('scroll');
        if (!atBottom && !isFetchScroll && isBottom(element)) {
            setBottom(true)
        }
        if (!isBottom(element)) {
            setBottom(false)
        }
    }
    function isBottom(element) {
        return element?.getBoundingClientRect()?.bottom <= window?.innerHeight+5;
    }
    return [isFetchScroll, setIsFetching];
};

export default Scroll;
