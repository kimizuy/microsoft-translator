/**
 * The supported languages for translation.
 * https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support
 *
 * @export
 * @typedef {Language}
 */
export type Language =
  | "af"
  | "sq"
  | "am"
  | "ar"
  | "hy"
  | "as"
  | "az"
  | "bn"
  | "ba"
  | "eu"
  | "bho"
  | "bs"
  | "bg"
  | "yue"
  | "ca"
  | "lzh"
  | "zh-Hans"
  | "zh-Hant"
  | "sn"
  | "hr"
  | "cs"
  | "da"
  | "prs"
  | "dv"
  | "doi"
  | "nl"
  | "en"
  | "et"
  | "fo"
  | "fj"
  | "fil"
  | "fi"
  | "fr"
  | "fr-ca"
  | "gl"
  | "ka"
  | "de"
  | "el"
  | "gu"
  | "ht"
  | "ha"
  | "he"
  | "hi"
  | "mww"
  | "hu"
  | "is"
  | "ig"
  | "id"
  | "ikt"
  | "iu"
  | "iu-Latn"
  | "ga"
  | "it"
  | "ja"
  | "kn"
  | "ks"
  | "kk"
  | "km"
  | "rw"
  | "tlh-Latn"
  | "tlh-Piqd"
  | "gom"
  | "ko"
  | "ku"
  | "kmr"
  | "ky"
  | "Lao"
  | "lo"
  | "lv"
  | "lt"
  | "ln"
  | "dsb"
  | "lug"
  | "mk"
  | "mai"
  | "mg"
  | "ms"
  | "ml"
  | "mt"
  | "mi"
  | "mr"
  | "mn-Cyrl"
  | "mn-Mong"
  | "my"
  | "ne"
  | "nb"
  | "nya"
  | "or"
  | "ps"
  | "fa"
  | "pl"
  | "pt"
  | "pa"
  | "otq"
  | "ro"
  | "run"
  | "ru"
  | "sm"
  | "sr-Cyrl"
  | "sr-Latn"
  | "st"
  | "nso"
  | "tn"
  | "sd"
  | "si"
  | "sk"
  | "sl"
  | "so"
  | "es"
  | "sw"
  | "sv"
  | "ty"
  | "ta"
  | "tt"
  | "te"
  | "th"
  | "bo"
  | "ti"
  | "to"
  | "tr"
  | "tk"
  | "uk"
  | "hsb"
  | "ur"
  | "ug"
  | "uz"
  | "vi"
  | "cy"
  | "xh"
  | "yo"
  | "yua"
  | "zu";

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
   * @type {?Language}
   */
  from?: Language;
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
  translations: { text: string; to: Language }[];
  detectedLanguage?: { language: Language; score: number };
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
   * @param {Language} to
   * @param {?Options} [options]
   * @returns {Promise<Success | null>}
   */
  async translate(
    texts: string | string[],
    to: Language,
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
      Array.isArray(texts) ? texts.map((text) => ({ text })) : [{ text: texts }]
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

      const isFailure = "error" in result;
      if (isFailure) {
        throw new Error(`${result.error.code}: ${result.error.message}`);
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
