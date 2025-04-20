import OpenAI from 'openai';
import { OPENAI_KEY } from './constant';
 

const client = new OpenAI({
  apiKey: [process.env.OPENAI_API_KEY], 
  dangerouslyAllowBrowser: true , 
});
export default client;