///<reference types="webpack-env" />
import * as React from "react"
import * as ReactDOM from "react-dom"
import {App} from './app'

const ROOT = document.querySelector("#root")

ReactDOM.render(<App/>, ROOT)

if(module.hot){
    module.hot.accept(() => console.log('hot update'))
}