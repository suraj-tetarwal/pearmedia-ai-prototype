import { GoogleGenerativeAI } from "@google/generative-ai"

import { ENHANCE_PROMPT, IMAGE_ANALYSIS_PROMPT } from "./constants"

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
})

// Enhance Prompt Function
export const getEnhancedPrompt = async input => {
    try {
        const result = await model.generateContent(
            `${ENHANCE_PROMPT}\n\nUser Input: ${input}`
        )

        const response = await result.response
        const text = response.text()

        return text
    } catch(error) {
        console.error("Enhancement failed", error)
        return input
    }
}

// Generate Image Function
export const generateImageFromPrompt = async (prompt) => {
  try {
    const url = "https://router.huggingface.co/nscale/v1/images/generations";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: prompt,
        response_format: "b64_json",
      }),
    });

    const data = await response.json();

    if (!data?.data?.[0]?.b64_json) {
      return null;
    }

    const base64Image = data.data[0].b64_json;
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

// Analyze Image
export const analyzeImage = async (base64Image, mimeType="image/png") => {
    try {
        const result = await model.generateContent([
            IMAGE_ANALYSIS_PROMPT, 
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Image.split(",")[1]
                }
            }
        ])

        const response = await result.response
        const text = response.text()

        console.log(text)
        return text
    } catch(error) {
        console.error("Image analysis failed:", error)
        return null
    }
}

