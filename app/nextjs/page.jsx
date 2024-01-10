"use client";
import React, { useState } from 'react'
import Emoji from "../components/Emoji"

const nextjs = () => {

    const [lastName, setLastName] = useState('')

    const handleSubmit = async () => {
        console.log("Woo hoo!")

        // Send the data to the server
        const res = await fetch("/api/next", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({key: "something here", lastName: lastName})
        })

        console.log(res)

        const resJSON = await res.json()
        console.log(resJSON)
    }

  return (
    <div>
        This is where the page appears
        <p>Tailwind CSS is awesome</p>
        <p>Bryan</p>
        <p>My last name is : {lastName}</p>
        <div>
            <input type="text" className='outline rounded' value={lastName} onChange={ (e) => setLastName(e.target.value)} />
            <button className='border ms-4 border-slate-500 px-3 py-1 rounded' onClick={handleSubmit}>Submit</button>
        </div>
        <div>
            <Emoji color="green" />
        </div>
    </div>
  )
}

export default nextjs