// start here
"use client";
import React from 'react'
import { useState } from 'react'
import Title from "../components/Title"
import TwoColumnLayout from "../components/TwoColumnLayout"
import PageHeader from "../components/PageHeader"
import PromptBox from "../components/PromptBox"
import ResultWithSources from "../components/ResultWithSources"
import "../globals.css"

const Memory = () => {
    const [prompt, setPrompt] = useState('')
    const [error, setError] = useState(null)
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "Hi, it's me, your AI Assistant. I remember everything. Ask me anything.",
            searchDocuments: null
        }
    ])

    const [firstMessage, setFirstMessage] = useState(true)

    const handlePromptChange = (e) => {
        setPrompt(e.target.value)
    }

    const handleSubmitPrompt = async () => {
        console.log("sending", prompt)

        // Upadate the user message
        setMessages((prevMessages) => {
            return [...prevMessages, {
                type: "user",
                text: prompt,
                searchDocuments: null
            }]
        })

        // Send the data to the server
        try {
            const response = await fetch("/api/memory", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({input: prompt, firstMessage})
            })
            
            // so we dont reinitialize the chain
            setFirstMessage(false)

            setPrompt('')

            const searchRes = await response.json()

            console.log(searchRes.output.response)
            // add the bot message
            setMessages((prevMessages) => {
                return [...prevMessages, {
                    type: "bot",
                    text: searchRes.output.response,
                    searchDocuments: null
                }]
            } )
            setError("")

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }

        } catch (err) {
            setError(err.message)
            console.log(err)
        }
        
    }

  return (
    <>
        <Title 
            headingText={"Memory"}
            emoji={"🧠"}
        />
        <TwoColumnLayout 
            leftChildren={<>
                <PageHeader 
                    heading={"I remember everything"}
                    boldText={"Let's see if it can remember your name and favourite food. This tool will let you ask anything contained in a PDF document."}
                    description={"This tool uses Buffer Memory and Conversation Chain. Head over to Module X to get started!"}
                />
            </>}
            rightChildren={<>
                <ResultWithSources messages={messages} pngFile={"brain"} />
                <PromptBox 
                    prompt={prompt}
                    handleSubmit={handleSubmitPrompt}
                    // placeHolderText={prompt}
                    error={error}
                    handlePromptChange={handlePromptChange}
                    // pngFile=""
                />
            </>}
        />
    </>
  )
}

export default Memory