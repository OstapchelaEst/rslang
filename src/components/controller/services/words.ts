import { WordContent, WordLocation } from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class Words {
  baseUrl = new URL("https://rslang-app-2022.herokuapp.com/");

  getWords = async (wordLocation: WordLocation) => {
    const url = new URL("words", this.baseUrl);
    url.searchParams.set("group", String(wordLocation.group));
    url.searchParams.set("page", String(wordLocation.page));

    const response = await axios.get(url.href, {
      headers: {
        Accept: "application/json",
      },
    });

    const content: Array<WordContent> = await response.data;
    return content;
  };

  getWordByWordId = async ({ wordId }: { wordId: WordContent["id"] }) => {
    const url = new URL(`words/${wordId}`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Accept: "application/json",
      },
    });

    const content: WordContent = await response.data;
    return content;
  };
}

const words = new Words();
export default words;
