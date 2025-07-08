import OpenAI from 'openai';
import {ResponseFormatJSONSchema, ResponseFormatText} from "openai/resources";

interface Options {
  apiKey: string;
}

interface Request {
  prompt: string;
  systemPrompt: string;
  responseSchema: Record<string, any>;
  model: string;
  promptName: string;
}

export default {
  init(providerOptions: Options) {
    const openaiClient = new OpenAI({ apiKey: providerOptions.apiKey });
    return {
      getClient() {
        return openaiClient;
      },
      async checkModel(modelName: string) {
        try {
          return await openaiClient.models.retrieve(modelName);
        }
        catch (error) {
          return null;
        }
      },
      async makeRequest({ prompt, systemPrompt, promptName, responseSchema, model }: Request): Promise<null | any> {
        if (!prompt || !systemPrompt || !promptName || !model) {
          throw new Error('Next params are required: "prompt", "systemPrompt", "promptName", "model"');
        }
        const response_format: ResponseFormatText | ResponseFormatJSONSchema = responseSchema ? { type: 'json_schema', json_schema: {
            name: promptName,
            strict: true,
            schema: responseSchema,
          },
        } : {
          type: 'text',
        };
        const completion = await openaiClient.chat.completions.create({
          model: model,
          response_format,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt, },
          ],
        });
        if (!completion?.choices[0].message.content) return null;
        return JSON.parse(completion.choices[0].message.content);
      },
    }
  }
}
