import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

let model;
let memory;
let chain;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input, firstMessage } = req.body;

    if (!input) {
        throw new Error("No Input!");
    }

    if (firstMessage) {
        console.log("Initializing Chain...");
        model = new OpenAI({modelName: "gpt-3.5-turbo"});
        memory = new BufferMemory();
        chain = new ConversationChain({ llm: model, memory: memory });
    }

    console.log({ input });
    const response = await chain.call({ input });
    console.log({ response });
    res.status(200).json({ output: response });
  } else {
    res.status(405).json({ message: "Only POST is allowed!" });
  }
}
