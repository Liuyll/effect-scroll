import * as React from 'react'
import {useReducer,useCallback} from 'react'
import BuiredScroll from './buried_scroll'
const Boundary = require('react-suspence-boundary')

const App:React.SFC<any> = () => {
    const reducer = (state,action) => {
        switch (action.type) {
            case 'push':
                return {data:state.data.slice().concat([1,2,3,4,5])}
        }
    }
    const [state,dispatch] = useReducer(reducer,{data:[1,2,3,4,5,6,7,8,9,10]})
    const fetch = useCallback(({page,limit}) => {
        return new Promise((resolve) => {
            if(page){
                const fetchData = Array(limit).fill(0)
            }

            setTimeout(() => {
                dispatch({
                    type:'push'
                })
                resolve()
            },2000)
        })
    },[])


    const BuiredProps = {
        fetch:fetch
    }

    return (
        <div>
            <div>
                {state.data.map((v) => (
                    <div style={{height:'400px'}}>eqeq</div>
                ))}
            </div>
            <BuiredScroll {...BuiredProps}></BuiredScroll>
        </div>
    )
}

export {App}