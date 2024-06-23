const BASE_URL =
  "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

interface TranslateOptions {
  texts: string | string[];
  to: string;
  from?: string;
  textType?: "plain" | "html";
}

type Result = {
  translations: { text: string; to: string }[];
  detectedLanguage?: { language: string; score: number };
}[];

interface ErrorResponse {
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

  async translate({
    texts,
    to,
    from,
    textType = "plain",
  }: TranslateOptions): Promise<Result | null> {
    const url = new URL(BASE_URL);
    url.searchParams.set("to", to);
    if (from) {
      url.searchParams.set("from", from);
    }
    url.searchParams.set("textType", textType);

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

      const result: Result | ErrorResponse = await response.json();

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
