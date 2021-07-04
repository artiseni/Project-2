import React from 'react'

const Input = ({type, name, data, value}) => {
    return (
        <input type={type} onChange={data} name={name} value={value}></input>
    )
}

export default Input