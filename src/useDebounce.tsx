import {useState, useEffect} from 'react'

const useDebounce = (val:any, offset=600) => {
    const [debouncedVal, setDebouncedVal] = useState(val)

    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            setDebouncedVal(val);
        }, offset);
        return () => {
            clearTimeout(timeoutRef)
        }
    }, [val])

    return debouncedVal;
}

export default useDebounce;