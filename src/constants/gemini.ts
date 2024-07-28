import * as process from "node:process";
import {GoogleGenerativeAI} from '@google/generative-ai'

const geminiConfig = {
	apiKey: process.env.GEMINI_API_KEY,
}

const genAI = new GoogleGenerativeAI(geminiConfig.apiKey ?? '');

const gemini = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

export default gemini