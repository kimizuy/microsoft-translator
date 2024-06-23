// mod.ts
/**
 * A module providing a function to translate languages.
 *
 * @example
 * ```ts
 * import { translate } from "@kimizuy/translate";
 *
 * const translator = new Translator(YOUR_API_KEY, RESION);
 * const result = await translator.translate({
 *   texts: "Hello",
 *   to: "ja",
 *   from: "en",
 * });
 * console.log(result?.[0].translations[0].text); // こんにちは
 * ```
 *
 * @module
 */

export * from "./translate.ts";
