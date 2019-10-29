import * as React from 'react'
import {useRef,useState,useCallback,useEffect} from 'react'

interface IProps {
    fetch:(params:{}) => Promise<unknown>,
    isPage ?: boolean,
    page ?: number,
    limit ?: number
}


const BuiredScroll:React.SFC<IProps> = (props:IProps) => {

    let page,setPage,limit,setLimit
    if(props.isPage != undefined && props.isPage){
        [page,setPage] = useState(props.page);
        [limit,setLimit] = useState(props.page)
    }
    else {
        useState(null)
        useState(null)
    }

    const buried_el = useRef<HTMLDivElement>()
    const ioCb = useCallback(([entry]) => {
        if(entry && entry.isIntersecting){
            props.fetch({page,limit}).then((res) => {
                if(props.isPage){
                    setPage(page + 1)
                }    
            })
        }
    },[props])

    useEffect(() => {
        const Observer = new IntersectionObserver(ioCb)
        Observer.observe(buried_el.current)
        return () => Observer.unobserve(buried_el.current)
    })

    return (
        <div id="buried_fetch_bottom" ref={buried_el}></div>
    )
} 

export default BuiredScroll