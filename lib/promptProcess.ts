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
                prompt = `${values.story} Berdasarkan analisis emosi, emosi dominan yang dirasakan adalah ${values.feel}. Berikan nasihat atau kata-kata motivasi yang sesuai untuk mengatasi atau memperkuat emosi ini.` ;
                break;
            case "pemarah":
                prompt = `${values.story} Berdasarkan analisis emosi, emosi dominan yang dirasakan adalah ${values.feel}. Berikan nasihat yang seperti memarahi atau kata-kata motivasi yang keras yang sesuai untuk mengatasi atau memperkuat emosi ini.` ;

               break;
            case "tidak peduli":
                prompt = `${values.story} Berdasarkan analisis emosi, emosi dominan yang dirasakan adalah ${values.feel}. Berikan nasihat yang terkesan tidak peduli yang sesuai untuk mengatasi atau memperkuat emosi ini.` ;
                break;
             
            case "lebay":
                prompt = `${values.story} Berdasarkan analisis emosi, emosi dominan yang dirasakan adalah ${values.feel}. Berikan nasihat yang dilebih lebihkan atau kata-kata motivasi berlebihan yang sesuai untuk mengatasi atau memperkuat emosi ini.` ;
                break;
            default:
                prompt = `${values.story} Berdasarkan analisis emosi, emosi dominan yang dirasakan adalah ${values.feel}. Berikan nasihat atau kata-kata motivasi yang sesuai untuk mengatasi atau memperkuat emosi ini.` ;
                break;
               
        }
        console.log(prompt)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
    
        const response = result.response;
        const text = response.text();
        return text;
      
}