"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import ResultStreaming from "../components/ResultStreaming";
import Title from "../components/Title";
import TwoColumnLayout from "app/components/TwoColumnLayout";

const Streaming = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState("");
  const [source, setSource] = useState(null);
  //   add code

  const processToken = (token) => {
    // add code
    return token.replace(/\\n/g, "\n").replace(/\"/g, "");
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(`sending ${prompt}`)
      await fetch(`/api/streaming`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt})
      })

      // close existing sources
      if (source) {
        source.close()
      }


      // create new event source
      const newSource = new EventSource(`/api/streaming`);
      console.log(newSource)
      setSource(newSource);

      // add event listeners
      newSource.addEventListener("newToken", (e) => {
        const token = processToken(e.data);
        setData((prevData) => prevData + token)
      })
      
      newSource.addEventListener("end", ()=> {
        newSource.close();
      })

      // Clean up the EventSource on component unmount
      useEffect(()=> {
        // Stuff is gonna happen
        return () => {
          if (source) {
            source.close()
          }
        }
      }, [source])

    } catch (err) {
      console.error(err);
      setError(error);
    }
  };

  // Clean up the EventSource on component unmount
  //   add code
  return (
    <>
      <Title emoji="💭" headingText="Streaming" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="Spit a Rap."
              boldText="Nobody likes waiting for APIs to load. Use streaming to improve the user experience of chat bots."
              description="This tutorial uses streaming.  Head over to Module X to get started!"
            />
          </>
        }
        rightChildren={
          <>
            <ResultStreaming data={data} />
            <PromptBox
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={handleSubmit}
              placeHolderText={"Enter your name and city"}
              error={error}
              pngFile="pdf"
            />
          </>
        }
      />
    </>
  );
};

export default Streaming;
