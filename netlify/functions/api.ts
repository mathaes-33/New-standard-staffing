import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI, Type } from "@google/genai";

// Schemas (copied from original geminiService.ts for self-containment)
const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING, description: "Full name of the person." },
    email: { type: Type.STRING, description: "Email address." },
    phone: { type: Type.STRING, description: "Phone number." },
    address: { type: Type.STRING, description: "Full mailing address, including street, city, state, and ZIP code." },
    summary: { type: Type.STRING, description: "A brief professional summary or objective." },
    skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of technical and soft skills." },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          company: { type: Type.STRING },
          location: { type: Type.STRING },
          dates: { type: Type.STRING, description: "e.g., 'May 2020 - Present'" },
          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["jobTitle", "company", "dates", "responsibilities"]
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          institution: { type: Type.STRING },
          location: { type: Type.STRING },
          graduationYear: { type: Type.STRING },
        },
        required: ["degree", "institution", "graduationYear"]
      },
    },
  },
  required: ["fullName", "email", "skills", "experience", "education", "summary"],
};

const jobSchema = {
    type: Type.OBJECT,
    properties: {
        jobTitle: { type: Type.STRING },
        company: { type: Type.STRING },
        location: { type: Type.STRING },
        description: { type: Type.STRING, description: "A brief 2-3 sentence description." },
        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["jobTitle", "company", "location", "description", "skills"],
};

const jobListSchema = { type: Type.ARRAY, items: jobSchema };

const jobAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        suggestedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggestedCategory: { type: Type.STRING },
        clarityFeedback: { type: Type.STRING },
    },
    required: ["suggestedSkills", "suggestedCategory", "clarityFeedback"],
};

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }
    
    const { API_KEY } = process.env;
    if (!API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: 'API_KEY not configured' }) };
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    try {
        const { endpoint, payload } = JSON.parse(event.body || '{}');

        if (!endpoint || !payload) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing endpoint or payload' }) };
        }

        let response;
        switch(endpoint) {
            case 'parseResume':
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Parse the following resume text: \n\n${payload.resumeText}`,
                    config: { responseMimeType: "application/json", responseSchema: resumeSchema },
                });
                return { statusCode: 200, body: response.text.trim() };
            
            case 'findMatchingJobs':
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Based on this profile, find 3 fictional jobs: ${JSON.stringify(payload.profile)}`,
                    config: { responseMimeType: "application/json", responseSchema: jobListSchema },
                });
                return { statusCode: 200, body: response.text.trim() };
            
            case 'analyzeJobDescription':
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Analyze this job posting: ${JSON.stringify(payload.jobInfo)}`,
                    config: { responseMimeType: "application/json", responseSchema: jobAnalysisSchema },
                });
                return { statusCode: 200, body: response.text.trim() };
                
            case 'findSimilarJobs':
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Find 3 similar fictional jobs for this posting: ${JSON.stringify(payload.job)}`,
                    config: { responseMimeType: "application/json", responseSchema: jobListSchema },
                });
                return { statusCode: 200, body: response.text.trim() };

            case 'generateResourceContent':
                const persona = payload.audience === 'Job Seeker' 
                    ? 'You are an expert career coach.' 
                    : 'You are an expert hiring manager.';
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `${persona} Provide a guide on: "${payload.topic}".`,
                });
                return { statusCode: 200, body: JSON.stringify({ content: response.text }) };

            default:
                return { statusCode: 400, body: JSON.stringify({ error: `Unknown endpoint: ${endpoint}` }) };
        }

    } catch (error) {
        console.error("Error in Netlify function:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: error instanceof Error ? error.message : 'An internal server error occurred' }) 
        };
    }
};

export { handler };
