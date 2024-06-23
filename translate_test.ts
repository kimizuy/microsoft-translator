import { assertEquals } from "jsr:@std/assert";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { Translator } from "./translate.ts";

const env = await load();
const apiKey = env["API_KEY"];

Deno.test(async function translateToJaFromEn() {
  const translator = new Translator(apiKey, "canadacentral");
  const result = await translator.translate({
    texts: "Hello",
    to: "ja",
    from: "en",
  });

  assertEquals(result?.[0].translations[0].text, "こんにちは");
});
