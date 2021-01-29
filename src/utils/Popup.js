import React from 'react'
import {Popup} from 'semantic-ui-react'

export default function PopupComponent({children, text}) {
    return <Popup content = {text} trigger = {children}/>
}