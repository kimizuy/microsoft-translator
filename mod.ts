// mod.ts
/**
 * A module providing a function to translate languages.
 *
 * @example
 * ```ts
 * import { Translator } from "@kimizuy/microsoft-translator"
 *
 * const translator = new Translator(YOUR_API_KEY, REGION);
 * const result = await translator.translate({
 *   texts: "Hello",
 *   to: "ja",
 *   from: "en",
 * });
 *
 * console.log(result?.[0].translations[0].text); // こんにちは
 * ```
 *
 * @module
 */

export * from "./translate.ts";
