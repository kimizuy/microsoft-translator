// mod.ts
/**
 * Client library for [Microsoft Translator Text API]("https://learn.microsoft.com/en-us/azure/ai-services/translator/reference/v3-0-translate"). This library allows you to translate text between multiple languages.
 *
 * It requires an API key to use the API. You can get the API key from the [Azure portal]("https://azure.microsoft.com/en-ca/get-started/azure-portal").
 *
 * @example
 * ```ts
 * import { Translator } from "@kimizuy/microsoft-translator"
 *
 * const translator = new Translator("YOUR_API_KEY", "YOUR_REGION");
 * const result = await translator.translate("Hello", "ja");
 *
 * console.log(result?.[0].translations[0].text); // こんにちは
 * ```
 *
 * @module
 */

export * from "./translate.ts";
