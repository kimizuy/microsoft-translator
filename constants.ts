/**
 * The base URL of the Azure Translator API.
 *
 * @type {"https://api.cognitive.microsofttranslator.com/translate?api-version=3.0"}
 */
export const BASE_URL =
  "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

const SUPPORTED_LANGUAGES = [
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "as",
  "az",
  "bn",
  "ba",
  "eu",
  "bho",
  "bs",
  "bg",
  "yue",
  "ca",
  "lzh",
  "zh-Hans",
  "zh-Hant",
  "sn",
  "hr",
  "cs",
  "da",
  "prs",
  "dv",
  "doi",
  "nl",
  "en",
  "et",
  "fo",
  "fj",
  "fil",
  "fi",
  "fr",
  "fr-ca",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "ha",
  "he",
  "hi",
  "mww",
  "hu",
  "is",
  "ig",
  "id",
  "ikt",
  "iu",
  "iu-Latn",
  "ga",
  "it",
  "ja",
  "kn",
  "ks",
  "kk",
  "km",
  "rw",
  "tlh-Latn",
  "tlh-Piqd",
  "gom",
  "ko",
  "ku",
  "kmr",
  "ky",
  "Lao",
  "lo",
  "lv",
  "lt",
  "ln",
  "dsb",
  "lug",
  "mk",
  "mai",
  "mg",
  "ms",
  "ml",
  "mt",
  "mi",
  "mr",
  "mn-Cyrl",
  "mn-Mong",
  "my",
  "ne",
  "nb",
  "nya",
  "or",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "otq",
  "ro",
  "run",
  "ru",
  "sm",
  "sr-Cyrl",
  "sr-Latn",
  "st",
  "nso",
  "tn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "es",
  "sw",
  "sv",
  "ty",
  "ta",
  "tt",
  "te",
  "th",
  "bo",
  "ti",
  "to",
  "tr",
  "tk",
  "uk",
  "hsb",
  "ur",
  "ug",
  "uz",
  "vi",
  "cy",
  "xh",
  "yo",
  "yua",
  "zu",
] as const;

/**
 * The supported languages for translation.
 *
 * https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support
 *
 * @export
 * @typedef {SupportedLanguage}
 */
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];