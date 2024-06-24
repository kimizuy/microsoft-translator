import { BASE_URL, type SupportedLanguage } from "./constants.ts";

/**
 * The options for the translation.
 *
 * @export
 * @interface Options
 * @typedef {Options}
 */
export interface Options {
  /**
   * The language to translate from.
   *
   * @type {?SupportedLanguage}
   */
  from?: SupportedLanguage;
  /**
   * The type of the text.
   *
   * @type {?("plain" | "html")}
   */
  textType?: "plain" | "html";
}

/**
 * The result of the translation.
 *
 * @export
 * @typedef {Result}
 */
export type Result = {
  translations: { text: string; to: string }[];
  detectedLanguage?: { language: string; score: number };
}[];

/**
 * The error response from the API.
 *
 * @export
 * @interface ErrorResponse
 * @typedef {ErrorResponse}
 */
export interface ErrorResponse {
  /**
   * The error code and message.
   *
   * @type {{
   *     code: number;
   *     message: string;
   *   }}
   */
  error: {
    code: number;
    message: string;
  };
}

/**
 * A class to translate languages.
 *
 * @export
 * @class Translator
 * @typedef {Translator}
 */
export class Translator {
  /**
   * The API key of the Azure service.
   *
   * @private
   * @type {string}
   */
  private apiKey: string;
  /**
   * The region of the Azure service.
   *
   * @private
   * @type {string}
   */
  private region: string;

  /**
   * Creates an instance of Translator.
   *
   * @constructor
   * @param {string} apiKey
   * @param {string} region
   */
  constructor(apiKey: string, region: string) {
    this.apiKey = apiKey;
    this.region = region;
  }

  /**
   * Translates the given texts to the specified language.
   *
   * @async
   * @param {(string | string[])} texts
   * @param {SupportedLanguage} to
   * @param {Options} param0
   * @param {SupportedLanguage} param0.from
   * @param {("plain" | "html")} [param0.textType="plain"]
   * @returns {Promise<Result | null>}
   */
  async translate(
    texts: string | string[],
    to: SupportedLanguage,
    options?: Options
  ): Promise<Result | null> {
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
