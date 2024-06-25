import type { SUPPORTED_LANGUAGES } from "./constants.ts";

/**
 * The supported languages for translation.
 *
 * @export
 * @typedef {SupportedLanguage}
 */
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Options for the Translator class.
 *
 * @export
 * @interface Options
 * @typedef {Options}
 */
export interface Options {
  /**
   * The language code of the input text.
   *
   * @type {?SupportedLanguage}
   */
  from?: SupportedLanguage;
  /**
   * The type of the input text.
   *
   * @type {?("plain" | "html")}
   */
  textType?: "plain" | "html";
}

/**
 * The response from the Microsoft Translator Text API.
 *
 * @export
 * @typedef {Success}
 */
export type Success = {
  translations: { text: string; to: string }[];
  detectedLanguage?: { language: string; score: number };
}[];

/**
 * The error response from the Microsoft Translator Text API.
 *
 * @export
 * @interface Failure
 * @typedef {Failure}
 */
export interface Failure {
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
 * A class for translating text using the Microsoft Translator Text API.
 *
 * @export
 * @class Translator
 * @typedef {Translator}
 */
export class Translator {
  /**
   * The API key for the Microsoft Translator Text API.
   *
   * @private
   * @type {string}
   */
  private apiKey: string;
  /**
   * The region for the Microsoft Translator Text API.
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
   * Translates the given text to the specified language.
   *
   * @async
   * @param {(string | string[])} texts
   * @param {SupportedLanguage} to
   * @param {?Options} [options]
   * @returns {Promise<Success | null>}
   */
  async translate(
    texts: string | string[],
    to: SupportedLanguage,
    options?: Options
  ): Promise<Success | null> {
    const url = new URL(
      "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0"
    );
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
