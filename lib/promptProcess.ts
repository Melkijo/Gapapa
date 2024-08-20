import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const formSchema = z.object({
    storyDate: z.string(),
    storyTime: z.string(),
    feel: z.string(),
    story: z.string(),
    photo: z.any(),
    recommendation: z.string(),
    email: z.string(),
    model: z.string(),
  });
export default async function promptProcess(values: z.infer<typeof formSchema>) {
       let prompt = "";
        const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; // Provide a default value if the environment variable is undefined
        const genAI = new GoogleGenerativeAI(geminiApiKey);

        switch (values.model) {
            case "standar":
                prompt = `my story: ${values.story}  Based on the emotion analysis, the dominant emotion felt is  ${values.feel}. Provide appropriate advice or motivational words to overcome or strengthen this emotion. answer in the same language as in the story.` ;
                break;
            case "angry":
                prompt = `my story: ${values.story} Based on the emotion analysis, the dominant emotion felt is ${values.feel}. Provide scolding-like advice or strong motivational words as appropriate to address or reinforce these emotions. answer in the same language as in the story.` ;

               break;
            case "ignorance":
                prompt = `my story: ${values.story} Based on the emotion analysis, the dominant emotion felt is ${values.feel}. Give seemingly uncaring advice that is appropriate to address or reinforce these emotions. answer in the same language as in the story.` ;
                break;
             
            case "overreacting":
                prompt = `my story: ${values.story} Based on the emotion analysis, the dominant emotion felt is ${values.feel}. Give exaggerated advice or appropriate exaggerated motivational words to address or reinforce these emotions. answer in the same language as in the story.` ;
                break;
            default:
                prompt = `my story: ${values.story} Based on the emotion analysis, the dominant emotion felt is ${values.feel}. Give appropriate advice or motivational words to overcome or strengthen these emotions. answer in the same language as in the story.` ;
                break;
               
        }
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
    
        const response = result.response;
        const text = response.text();
        return text;
      
}