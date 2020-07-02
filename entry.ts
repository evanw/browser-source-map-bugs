import React from "react"
import { render } from "react-dom"
import { log } from "./other"
const str = "esbuild"
console.log('inside ' + new URL(document.currentScript.src).pathname)
log(str)
render(React.createElement("div"), document.body)
