import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from 'expo-constants';

const geminiKey = Constants.expoConfig?.extra?.geminiKey;

const genAI = new GoogleGenerativeAI(geminiKey)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generatePackingList(destination: string, startDate: string, endDate: string, activities: string[], additionalInfo: string) {
    try {
        const prompt = `
        You are an AI travel assistant. Generate a structured packing list for a trip no markdown formatting or extra text. The object must have exactly the following keys: "clothing", "toiletries", "electronics", and "miscellaneous". Each key’s value should be an array of checklist items (strings) that represent the packing items under that category.
        
        Input details:
        - Destination: ${destination}
        - Date Range: ${startDate} to ${endDate}
        - Activities: ${activities.join(", ")}
        - Additional Details: ${additionalInfo}
        
        Output format (exactly, without any additional text or markdown):
        {
          "clothing": ["item1", "item2", "item3"],
          "toiletries": ["item1", "item2"],
          "electronics": ["item1", "item2"],
          "miscellaneous": ["item1", "item2"]
        }
        `;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // console.log("Response Text", responseText)

        const updatedresponseText = cleanJsonString(responseText) // Clean the response to remove any unwanted formatting

        // console.log(updatedresponseText)

        // Split response into list items
        // return responseText.split("\n").filter(item => item.trim() !== "");
        return JSON.parse(updatedresponseText)
    } catch (error) {
        console.error("Error generating packing list:", error);
        return [];
    }
}

function cleanJsonString(jsonString: string): string {
    return jsonString
      .replace(/^```json\s*/, '') // Remove ```json from the start
      .replace(/^```/, '') // Remove ``` from the start if not followed by 'json'
      .replace(/```$/, '') // Remove ``` from the end
}
