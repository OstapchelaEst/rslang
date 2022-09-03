import {
  AggregatedWordsRequest,
  FullWord,
} from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class AggregatedWords {
  private baseUrl = "https://rs-learnwords-example.herokuapp.com/";

  getAggregatedWords = async (
    request: AggregatedWordsRequest,
    token: string
  ): Promise<FullWord[]> => {
    const url: URL = new URL(
      `users/${request.id}/aggregatedWords`,
      this.baseUrl
    );

    for (const [key, value] of Object.entries(request)) {
      if (key == "id") continue;

      url.searchParams.set(key, value);
    }

    const response = await axios.get(url.href, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const renameId = ({
      _id,
      ...rest
    }: Omit<FullWord, "id"> & { _id: string }): FullWord => ({
      id: _id,
      ...rest,
    });

    const content: Array<FullWord> =
      await response.data[0].paginatedResults.map(
        (aggregatedWord: Omit<FullWord, "id"> & { _id: string }): FullWord =>
          renameId(aggregatedWord)
      );

    return content;
  };
}

const aggregatedWords = new AggregatedWords();
export default aggregatedWords;
