import {
  StatisticsContent,
  UserWord,
} from "../../interfaces/interfaceServerAPI";

const axios = require("axios").default;

class Statistic {
  baseUrl = new URL("https://rslang-app-2022.herokuapp.com/");

  getStatistics = async (user: UserWord) => {
    const url = new URL(`users/${user.id}/statistics`, this.baseUrl);

    const response = await axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
      },
    });

    const content: StatisticsContent = await response.data;
    return content;
  };

  createStatistics = async (statistics: StatisticsContent) => {
    const url = new URL(`users/${statistics.id}/statistics`, this.baseUrl);
    const body = { optional: statistics.optional };

    const response = await axios({
      method: "put",
      url: url.href,
      data: body,
      headers: {
        Authorization: `Bearer ${statistics.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const content: StatisticsContent = await response.data;
    return content;
  };
}

const statistic = new Statistic();
export default statistic;
