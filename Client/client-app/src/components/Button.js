import React from 'react'

const Button = props => {
    return (
        <button className={props.className} onClick={props.data} title={props.title} content={props.content} username={props.username}>{props.text}</button>
    )
}

export default Button