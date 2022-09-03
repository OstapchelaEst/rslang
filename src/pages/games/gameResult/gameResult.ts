import {
  WordContent,
  OptionalUserWord,
  OptionalUserStatistics,
  AuthorizationContent,
} from "../../../interfaces/interfaceServerAPI";
import usersWords from "../../../controller/services/usersWords";
import statistic from "../../../controller/services/usersStatistic";
import { LOCAL_STORAGE } from "../../../controller/local-storage/local-storage";

export default class GameResult {
  innerHtmlTemplate = `
    <div class="gameResult__container">
      <div class="gameResult__truthy">
        <p class="gameResult__title">Правильные ответы:</p>
        
      </div>
      <div class="gameResult__falsy">
        <p class="gameResult__title">Неправильные ответы:</p>

      </div>
      <div class="gameResult__btns">
        <a href="/" data-navigo class="gameResult__btn gameResult__btn_main">Главная страница</a>
        <a href="#/all-games" data-navigo class="gameResult__btn gameResult__btn_games">Другие игры</a>
      </div>
    </div>
  `;

  innerHtmlTemplateGameResultItem = `
    <svg class="gameResult__audio" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/></svg>
    <div class="gameResult__word"></div>
    <p>-</p>
    <div class="gameResult__translate"></div>
  `;

  contentURL: string;

  componentElem: HTMLElement;

  localStorageUser: AuthorizationContent;

  constructor(contentURL: string) {
    this.componentElem = document.createElement("div");
    this.localStorageUser = LOCAL_STORAGE.getDataUser();
    this.contentURL = contentURL;
  }

  createThisComponent() {
    this.componentElem.innerHTML = this.innerHtmlTemplate;
    this.componentElem.classList.add("gameResult");
  }

  createComponent() {
    this.createThisComponent();
  }

  async showComponent(
    gameName: "sprint" | "audioCall",
    answers: Array<{ result: boolean; wordContent: WordContent }>
  ) {
    this.createComponent();

    if (localStorage.getItem("user")) {
      await this.updateUserWords_OptionalProperty(gameName, answers);
      await this.updateUserStatistics(gameName, answers);
    }

    const contentElem = document.querySelector(
      ".main__container"
    ) as HTMLElement;
    contentElem.append(this.componentElem);
    document.querySelector("body")?.classList.add("_lock");
    const truthyAnswerObjs = answers.filter(
      (answerObj) => answerObj.result === true
    );
    const falsyAnswerObjs = answers.filter(
      (answerObj) => answerObj.result === false
    );

    const truthyContainer = this.componentElem.querySelector(
      ".gameResult__truthy"
    ) as HTMLElement;
    const falsyContainer = this.componentElem.querySelector(
      ".gameResult__falsy"
    ) as HTMLElement;

    this.createGameResultItems(truthyAnswerObjs, truthyContainer);
    this.createGameResultItems(falsyAnswerObjs, falsyContainer);
  }

  getBestTrueStreak(answers: { result: boolean; wordContent: WordContent }[]) {
    if (answers.length === 0) {
      return 0;
    }

    const streaks: Array<number> = [];
    let streak = 0;
    answers.forEach((answer, index) => {
      if (answer.result === true) {
        streak += 1;
      }

      if (index === answers.length - 1) {
        streaks.push(streak);
        return;
      }

      if (answer.result === false) {
        streaks.push(streak);
        streak = 0;
      }
    });

    streaks.sort((a, b) => b - a);
    return streaks[0];
  }

  async updateUserStatistics(
    gameName: "sprint" | "audioCall",
    answers: { result: boolean; wordContent: WordContent }[]
  ) {
    const currentDate = new Date().toLocaleDateString("en-US");
    const currentBestStreak = this.getBestTrueStreak(answers);

    const currentAmountOfRounds = answers.length;
    let currentAmountOfTruthyAnswers = 0;
    answers.forEach((answer) => {
      if (answer.result === true) {
        currentAmountOfTruthyAnswers += 1;
      }
    });

    try {
      const userStatistics = await statistic.getStatistics({
        token: this.localStorageUser.token,
        id: this.localStorageUser.userId,
      });

      if (currentDate in userStatistics.optional) {
        const currentDateOptionalStatistics =
          userStatistics.optional[currentDate];
        const updatedOptionalStatistics = userStatistics.optional;

        updatedOptionalStatistics[currentDate][gameName].totalCount +=
          currentAmountOfRounds;
        updatedOptionalStatistics[currentDate][gameName].trueCount +=
          currentAmountOfTruthyAnswers;

        if (
          currentDateOptionalStatistics[gameName].bestStreak < currentBestStreak
        ) {
          updatedOptionalStatistics[currentDate][gameName].bestStreak =
            currentBestStreak;
        }

        statistic.createStatistics({
          token: this.localStorageUser.token,
          id: this.localStorageUser.userId,
          optional: updatedOptionalStatistics,
        });
      } else {
        const updatedOptionalStatistics = userStatistics.optional;
        updatedOptionalStatistics[currentDate] = {
          sprint: {
            bestStreak: gameName === "sprint" ? currentBestStreak : 0,
            totalCount: gameName === "sprint" ? currentAmountOfRounds : 0,
            trueCount: gameName === "sprint" ? currentAmountOfTruthyAnswers : 0,
          },
          audioCall: {
            bestStreak: gameName === "audioCall" ? currentBestStreak : 0,
            totalCount: gameName === "audioCall" ? currentAmountOfRounds : 0,
            trueCount:
              gameName === "audioCall" ? currentAmountOfTruthyAnswers : 0,
          },
        };

        statistic.createStatistics({
          token: this.localStorageUser.token,
          id: this.localStorageUser.userId,
          optional: updatedOptionalStatistics,
        });
      }
    } catch {
      const optionalStatistics: OptionalUserStatistics = {
        [currentDate]: {
          sprint: {
            bestStreak: gameName === "sprint" ? currentBestStreak : 0,
            totalCount: gameName === "sprint" ? currentAmountOfRounds : 0,
            trueCount: gameName === "sprint" ? currentAmountOfTruthyAnswers : 0,
          },
          audioCall: {
            bestStreak: gameName === "audioCall" ? currentBestStreak : 0,
            totalCount: gameName === "audioCall" ? currentAmountOfRounds : 0,
            trueCount:
              gameName === "audioCall" ? currentAmountOfTruthyAnswers : 0,
          },
        },
      };

      statistic.createStatistics({
        token: this.localStorageUser.token,
        id: this.localStorageUser.userId,
        optional: optionalStatistics,
      });
    }
  }

  async updateUserWords_OptionalProperty(
    gameName: "sprint" | "audioCall",
    answers: { result: boolean; wordContent: WordContent }[]
  ) {
    const userWordsContent = await usersWords.getUserWords({
      token: this.localStorageUser.token,
      userId: this.localStorageUser.userId,
    });

    answers.forEach(async (answer) => {
      const relatedUserWordContent = userWordsContent.find(
        (userWordContent) => userWordContent.wordId === answer.wordContent.id
      );
      let isWordNew: boolean;
      if (relatedUserWordContent) {
        if (relatedUserWordContent.optional.dateWhenItBecameLearned === false) {
          isWordNew = true;
        } else {
          isWordNew = false;
        }
      } else {
        isWordNew = true;
      }

      if (relatedUserWordContent) {
        const updatedOptional: OptionalUserWord =
          relatedUserWordContent.optional;

        if (gameName === "sprint") {
          if (updatedOptional.sprint) updatedOptional.sprint.totalCount += 1;
          if (answer.result === true) {
            if (updatedOptional.sprint) updatedOptional.sprint.trueCount += 1;
          }
        }

        if (isWordNew === true) {
          updatedOptional.dateWhenItBecameNew = new Date().toLocaleDateString(
            "en-US"
          );
          updatedOptional.gameInWhichItBecameNew = `${gameName}`;
        }

        const currentDifficulty = relatedUserWordContent.difficulty;

        if (currentDifficulty === "basic") {
          updatedOptional.dateWhenItBecameLearned =
            answer.result === true
              ? new Date().toLocaleDateString("en-US")
              : false;

          usersWords.updateUserWord({
            token: this.localStorageUser.token,
            id: this.localStorageUser.userId,
            wordId: answer.wordContent.id,
            difficulty: answer.result === true ? "easy" : "hard",
            optional: updatedOptional,
          });
        } else if (currentDifficulty === "hard") {
          usersWords.updateUserWord({
            token: this.localStorageUser.token,
            id: this.localStorageUser.userId,
            wordId: answer.wordContent.id,
            difficulty: answer.result === true ? "basic" : "hard",
            optional: updatedOptional,
          });
        } else if (currentDifficulty === "easy") {
          usersWords.updateUserWord({
            token: this.localStorageUser.token,
            id: this.localStorageUser.userId,
            wordId: answer.wordContent.id,
            difficulty: answer.result === true ? "easy" : "basic",
            optional: updatedOptional,
          });
        }
      } else {
        const optional: OptionalUserWord = {
          dateWhenItBecameLearned:
            answer.result === true
              ? new Date().toLocaleDateString("en-US")
              : false,
          dateWhenItBecameNew: new Date().toLocaleDateString("en-US"),
          gameInWhichItBecameNew: gameName,
          sprint: {
            totalCount: 0,
            trueCount: 0,
          },
          audioCall: {
            totalCount: 0,
            trueCount: 0,
          },
        };

        if (gameName === "sprint") {
          if (optional.sprint) optional.sprint.totalCount = 1;
          if (optional.sprint) {
            optional.sprint.trueCount = answer.result === true ? 1 : 0;
          }
        }

        usersWords.createUserWord({
          token: this.localStorageUser.token,
          id: this.localStorageUser.userId,
          wordId: answer.wordContent.id,
          difficulty: answer.result === true ? "easy" : "hard",
          optional,
        });
      }
    });
  }

  createGameResultItems(
    answersObjs: {
      result: boolean;
      wordContent: WordContent;
    }[],
    hostElem: HTMLElement
  ) {
    answersObjs.forEach((answerObj) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("gameResult__item");
      resultItem.innerHTML = this.innerHtmlTemplateGameResultItem;

      const audioElem = resultItem.querySelector(
        ".gameResult__audio"
      ) as HTMLElement;
      const wordElem = resultItem.querySelector(
        ".gameResult__word"
      ) as HTMLElement;
      const translateElem = resultItem.querySelector(
        ".gameResult__translate"
      ) as HTMLElement;

      audioElem.addEventListener("click", () => {
        const audio = new Audio(
          `${this.contentURL}/${answerObj.wordContent.audio}`
        );
        audio.play();
      });
      wordElem.textContent = answerObj.wordContent.word;
      translateElem.textContent = answerObj.wordContent.wordTranslate;

      hostElem.append(resultItem);
    });
  }
}
