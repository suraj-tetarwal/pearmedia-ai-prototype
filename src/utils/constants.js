export const ENHANCE_PROMPT = `
You are an expert prompt engineer. Transform the following simple request into a 50-word descriptive masterpiece including lighting, camera angle, and artistic style.
`

export const IMAGE_ANALYSIS_PROMPT = `
Analyze this image and return the result in JSON format with the following keys:

{
  "main_object": "",
  "color_palette": "",
  "artistic_style": "",
  "lighting": ""
}

Keep answers short and clear.
`;