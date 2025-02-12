import axios from "axios";

const API_KEY = "AIzaSyAjaUcEcCnuw_3CZ9D8fbQnkvfkN3vJ5Uc";
const API_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;

export default {
  analyzeComment: async (comment: string) => {
    try {
      const response = await axios.post(API_URL, {
        comment: { text: comment },
        languages: ["en", "fr"],
        requestedAttributes: { TOXICITY: {}, IDENTITY_ATTACK: {} },
      });

      return response.data;
    } catch (error) {
      console.error("Error calling Perspective API:", error);
      throw new Error("Failed to analyze comment");
    }
  },
}
