import { BASE_URL, type SupportedLanguage } from "./constants.ts";

export interface Options {
  from?: SupportedLanguage;
  textType?: "plain" | "html";
}

export type Success = {
  translations: { text: string; to: string }[];
  detectedLanguage?: { language: string; score: number };
}[];

export interface Failure {
  error: {
    code: number;
    message: string;
  };
}

export class Translator {
  private apiKey: string;
  private region: string;

  constructor(apiKey: string, region: string) {
    this.apiKey = apiKey;
    this.region = region;
  }

  async translate(
    texts: string | string[],
    to: SupportedLanguage,
    options?: Options
  ): Promise<Success | null> {
    const url = new URL(BASE_URL);
    url.searchParams.set("to", to);
    if (options?.from) {
      url.searchParams.set("from", options.from);
    }
    url.searchParams.set("textType", options?.textType || "plain");

    const body = JSON.stringify(
      typeof texts === "string"
        ? [{ text: texts }]
        : texts.map((text) => ({ text }))
    );

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": this.apiKey,
          "Ocp-Apim-Subscription-Region": this.region,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body,
      });

      const result: Success | Failure = await response.json();

      if ("error" in result) {
        throw new Error(`${result.error.code}: ${result.error.message}`);
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
