import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import userStatisticService from "../../controller/services/usersStatistic";
import {
  AuthorizationContent,
  StatisticsContent,
} from "../../interfaces/interfaceServerAPI";
import "./styles/statistics.scss";

export default class Statistic {
  public el: HTMLElement;

  constructor() {
    this.el = document.createElement("div");
    this.el.classList.add("statistics");
  }

  async render() {
    const userData: AuthorizationContent = LOCAL_STORAGE.getDataUser();
    await userStatisticService
      .getStatistics({
        token: userData.token,
        id: userData.userId,
      })
      .then((response) => {
        this.el.innerHTML = this.renderStatistics(response);
      })
      .catch((err) => {
        this.el.innerHTML = this.renderStatistics(err, err.response.status);
      });
  }

  renderStatistics(
    statistics: StatisticsContent,
    status: number | null = null
  ): string {
    let total = 0;
    let totalPercent = 0;
    let audiocallTotal = 0;
    let sprintTotal = 0;
    let audiocallTrue = 0;
    let sprintTrue = 0;
    let audiocallPercent = 0;
    let sprintPercent = 0;
    let audiocallbestStreak = 0;
    let sprintbestStreak = 0;

    const date: string = new Date().toLocaleDateString("en-US");
    if (status !== 404) {
      if (statistics?.optional[date]) {
        audiocallTotal = statistics.optional[date].audioCall.totalCount;
        sprintTotal = statistics.optional[date].sprint.totalCount;
        audiocallTrue = statistics.optional[date].audioCall.trueCount;
        sprintTrue = statistics.optional[date].sprint.trueCount;
        audiocallbestStreak = statistics.optional[date].audioCall.bestStreak;
        sprintbestStreak = statistics.optional[date].sprint.bestStreak;

        total =
          statistics.optional[date].audioCall.totalCount +
          statistics.optional[date].sprint.totalCount;
        if (total !== 0) {
          totalPercent = (audiocallTrue + sprintTrue) / total;
        } else {
          totalPercent = 0;
        }
        if (audiocallTotal !== 0) {
          audiocallPercent = audiocallTrue / audiocallTotal;
        } else {
          audiocallPercent = 0;
        }
        if (sprintTotal !== 0) {
          sprintPercent = sprintTrue / sprintTotal;
        } else {
          sprintPercent = 0;
        }
      }
    }

    return `
      <h2 class="statistics__header">Статистика за сегодня</h2>
      <div class="statistics__content">
        <div class="statistics__learned-words">
          <p class="statistics__value">${total}</p>
          <p>слов изучено</p>
        </div>
        <div class="statistics__right-answers">
          <p class="statistics__value">${Math.round(totalPercent * 100)}%</p>
          <p>правильных ответов</p>
        </div>
      </div>
      <div class="statistics__game">
        <div class="statistics__game-style statistics__game-audiocall">
          <h3>Аудиовызов</h3>
          <p>Изучено ${audiocallTotal} слов.</p>
          <p>Правильных ответов: ${Math.round(audiocallPercent * 100)}%.</p>
          <p>Самая длинная серия правильных ответов: ${audiocallbestStreak}.</p>
        </div>
        <div class="statistics__game-style statistics__game-sprint">
          <h3>Спринт</h3>
          <p>Изучено ${sprintTotal} слов.</p>
          <p>Правильных ответов: ${Math.round(sprintPercent * 100)}%.</p>
          <p>Самая длинная серия правильных ответов: ${sprintbestStreak}.</p>
        </div>
      </div>
    `;
  }
}
