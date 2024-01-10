import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";

const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      throw new Error("No input");
    }
    // Initialize model
    const chat = new OpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            sse.send(token, "newToken")
          }
        }
      ]
    })

    // create the prompt
    // const promt = `Create me a short rap about my name and city. Make it funny and punny. Name : ${input} `
    const promt = `Buatkan saya rap pendek tentang nama dan kota saya. Buatlah lucu dan berpantun. Nama : ${input}`

    console.log(promt)
    // call frontend to backend
    chat.call(promt).then(()=> {
      sse.send(null, "end")
    })

    return res.status(200).json({ result: "Streamming completed" });
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
