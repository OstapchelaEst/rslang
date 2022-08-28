import words from "../../../controller/services/words";
import usersWords from "../../../controller/services/usersWords";
import { LOCAL_STORAGE } from "../../../controller/local-storage/local-storage";
import GameResult from "../gameResult/gameResult";
import { getRandomInt, getRandomTrueOrFalse } from "../utils";
import {
  WordContent,
  UserWordContent,
  AuthorizationContent,
} from "../../../interfaces/interfaceServerAPI";

export default class Sprint {
  innerHtmlTemplate = `
    <div class="wrapper">
      <div class="sprint__content">
        <div class="sprint__timer-container">
          <div class="sprint__timer"></div>
          <svg>
            <circle r="18" cx="20" cy="20"></circle>
          </svg>
        </div>
        <div class="sprint__stat">
          <div class="sprint__stat-multiply">
            Умножение: x 
            <span class="sprint__multiplier"></span>
            <span class="sprint__stat-current-score"></span>
          </div>
          <div class="sprint__score">
            Очки: <span>0</span>
          </div>
        </div>
        <div class="sprint__series-count">
          <div class="dots-container">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <div class="sprint__round"></div>
    </div>
  `;

  innerHtmlTemplateRound = `
    <div class="sprint__word"></div>
    <p>это</p>
    <div class="sprint__option"></div>
    <div class="sprint__btns">
      <button class="sprint__no">Неверно</button>
      <button class="sprint__yes">Верно</button>
    </div>
  `;

  gameData: {
    answers: Array<{ result: boolean; wordContent: WordContent }>;
    initialPage: number;
    currentPage: number;
    currentWordContentIndex: number;
    currentGroup: number;
    intervalId: number;
    wordsContent: Array<WordContent>;
    userLearnedWordsContent?: Array<UserWordContent>;
    totalScore: number;
    multiplier: number;
    currentScore: number;
    seriesCount: number;
  } = {
    answers: [],
    initialPage: 0,
    currentPage: 0,
    currentGroup: 0,
    currentWordContentIndex: 0,
    intervalId: 0,
    wordsContent: [],
    totalScore: 0,
    multiplier: 1,
    currentScore: 20,
    seriesCount: 0,
  };

  localStorageUser: AuthorizationContent;

  componentElem: HTMLElement;

  contentURL: string;

  gameResult: GameResult;

  constructor(contentURL: string, gameResult: GameResult) {
    this.componentElem = document.createElement("div");
    this.localStorageUser = LOCAL_STORAGE.getDataUser();
    this.contentURL = contentURL;
    this.gameResult = gameResult;
  }

  createThisComponent() {
    this.componentElem.innerHTML = this.innerHtmlTemplate;
    this.componentElem.classList.add("sprint");
  }

  createComponent() {
    this.createThisComponent();
  }

  async startGameWithHardWords() {
    const contentElem = document.querySelector(
      ".main__container"
    ) as HTMLElement;
    contentElem.innerHTML = ``;
    contentElem.append(this.componentElem);

    const userWordsContent = await usersWords.getUserWords({
      token: this.localStorageUser.token,
      id: this.localStorageUser.userId,
    });

    const userHardWordsContent = userWordsContent.filter(
      (userWord) => userWord.difficulty === "hard"
    );

    const hardWordsContentPromises = userHardWordsContent.map(
      async (userHardWord) =>
        words.getWordByWordId({ wordId: userHardWord.wordId })
    );

    const hardWordsContent = await Promise.all(hardWordsContentPromises);

    this.gameData = {
      answers: [],
      initialPage: 0,
      currentPage: 0,
      currentGroup: 0,
      currentWordContentIndex: 0,
      intervalId: 0,
      wordsContent: hardWordsContent,
      totalScore: 0,
      multiplier: 1,
      currentScore: 20,
      seriesCount: 0,
    };

    this.startTimer();
    this.startRoundWithHardWords();
  }

  async startRoundWithHardWords() {
    const sprintRoundElem = document.querySelector(
      ".sprint__round"
    ) as HTMLDivElement;
    sprintRoundElem.innerHTML = this.innerHtmlTemplateRound;

    this.setSprintStat();

    if (
      this.gameData.currentWordContentIndex ===
      this.gameData.wordsContent.length
    ) {
      clearTimeout(this.gameData.intervalId);
      this.gameResult.showComponent("sprint", this.gameData.answers);
      return;
    }

    const { currentWordContentIndex } = this.gameData;
    this.gameData.currentWordContentIndex += 1;
    const wordContentAnswer =
      this.gameData.wordsContent[currentWordContentIndex];

    const { word } = wordContentAnswer;
    const isOptionTruthy = getRandomTrueOrFalse();
    let option: string;
    if (isOptionTruthy === true) {
      option = wordContentAnswer.wordTranslate;
    } else {
      const itemsOnPage = this.gameData.wordsContent.length - 1;
      let randomInt = getRandomInt(0, itemsOnPage - 1);
      while (randomInt === currentWordContentIndex) {
        randomInt = getRandomInt(0, itemsOnPage - 1);
      }
      option = this.gameData.wordsContent[randomInt].wordTranslate;
    }

    const wordElem = sprintRoundElem.querySelector(
      ".sprint__word"
    ) as HTMLDivElement;
    const optionElem = sprintRoundElem.querySelector(
      ".sprint__option"
    ) as HTMLDivElement;
    wordElem.textContent = word;
    optionElem.textContent = option;

    this.answerBtnsListeners({
      isOptionTruthy,
      wordContentAnswer,
      isGameWithHardsWords: true,
      skipLearnedWords: false,
    });
  }

  async startGameFromPage({ group, page }: { group: number; page: number }) {
    const contentElem = document.querySelector(
      ".main__container"
    ) as HTMLElement;
    contentElem.innerHTML = ``;
    contentElem.append(this.componentElem);

    if (localStorage.getItem("user")) {
      const [wordsContent, userWordsContent] = await Promise.all([
        words.getWords({ group, page }),
        usersWords.getUserWords({
          token: this.localStorageUser.token,
          id: this.localStorageUser.userId,
        }),
      ]);

      const userLearnedWordsContent = userWordsContent.filter(
        (userWord) => userWord.difficulty === "learned"
      );

      this.gameData = {
        answers: [],
        initialPage: page,
        currentPage: page,
        currentGroup: group,
        currentWordContentIndex: 0,
        intervalId: 0,
        userLearnedWordsContent,
        wordsContent,
        totalScore: 0,
        multiplier: 1,
        currentScore: 20,
        seriesCount: 0,
      };

      this.startTimer();
      this.startRound({ skipLearnedWords: true });
    } else {
      const wordsContent = await words.getWords({ group, page });

      this.gameData = {
        answers: [],
        initialPage: page,
        currentPage: page,
        currentGroup: group,
        currentWordContentIndex: 0,
        intervalId: 0,
        wordsContent,
        totalScore: 0,
        multiplier: 1,
        currentScore: 20,
        seriesCount: 0,
      };

      this.startTimer();
      this.startRound({ skipLearnedWords: false });
    }
  }

  async startGame(group: number) {
    const contentElem = document.querySelector(
      ".main__container"
    ) as HTMLElement;
    contentElem.innerHTML = ``;
    contentElem.append(this.componentElem);

    const pagesInGroup = 30;
    const page = getRandomInt(0, pagesInGroup - 1);
    const wordsContent = await words.getWords({ group, page });

    this.gameData = {
      answers: [],
      initialPage: page,
      currentPage: page,
      currentGroup: group,
      currentWordContentIndex: 0,
      intervalId: 0,
      wordsContent,
      totalScore: 0,
      multiplier: 1,
      currentScore: 20,
      seriesCount: 0,
    };

    this.startTimer();
    this.startRound({ skipLearnedWords: false });
  }

  async startRound({ skipLearnedWords }: { skipLearnedWords: boolean }) {
    const sprintRoundElem = document.querySelector(
      ".sprint__round"
    ) as HTMLDivElement;
    sprintRoundElem.innerHTML = this.innerHtmlTemplateRound;

    this.setSprintStat();

    if (this.gameData.currentWordContentIndex >= 20) {
      await this.updateWordsContent();
    }

    let wordContentAnswer: WordContent;
    let currentWordContentIndex: number;

    if (skipLearnedWords === true && this.gameData.userLearnedWordsContent) {
      do {
        if (this.gameData.currentWordContentIndex >= 20) {
          await this.updateWordsContent();

          if (this.gameData.initialPage === this.gameData.currentPage) {
            clearInterval(this.gameData.intervalId);
            this.gameResult.showComponent("sprint", this.gameData.answers);
            return;
          }
        }

        currentWordContentIndex = this.gameData.currentWordContentIndex;
        this.gameData.currentWordContentIndex += 1;
        wordContentAnswer = this.gameData.wordsContent[currentWordContentIndex];
      } while (
        this.gameData.userLearnedWordsContent.some(
          (userLearnedWord) => userLearnedWord.wordId === wordContentAnswer.id
        )
      );
    } else {
      currentWordContentIndex = this.gameData.currentWordContentIndex;
      this.gameData.currentWordContentIndex += 1;
      wordContentAnswer = this.gameData.wordsContent[currentWordContentIndex];
    }

    const { word } = wordContentAnswer;
    const isOptionTruthy = getRandomTrueOrFalse();
    let option: string;
    if (isOptionTruthy === true) {
      option = wordContentAnswer.wordTranslate;
    } else {
      const itemsOnPage = 20;
      let randomInt = getRandomInt(0, itemsOnPage - 1);
      while (randomInt === currentWordContentIndex) {
        randomInt = getRandomInt(0, itemsOnPage - 1);
      }
      option = this.gameData.wordsContent[randomInt].wordTranslate;
    }

    const wordElem = sprintRoundElem.querySelector(
      ".sprint__word"
    ) as HTMLDivElement;
    const optionElem = sprintRoundElem.querySelector(
      ".sprint__option"
    ) as HTMLDivElement;
    wordElem.textContent = word;
    optionElem.textContent = option;

    this.answerBtnsListeners({
      isOptionTruthy,
      wordContentAnswer,
      isGameWithHardsWords: false,
      skipLearnedWords,
    });
  }

  async updateWordsContent() {
    this.gameData.currentWordContentIndex = 0;

    let prevPage = this.gameData.currentPage - 1;
    if (prevPage <= -1) {
      const lastPageIndex = 29;
      prevPage = lastPageIndex;
    }
    this.gameData.currentPage = prevPage;

    this.gameData.wordsContent = await words.getWords({
      group: this.gameData.currentGroup,
      page: this.gameData.currentPage,
    });
  }

  answerBtnsListeners({
    isOptionTruthy,
    wordContentAnswer,
    isGameWithHardsWords,
    skipLearnedWords,
  }: {
    isOptionTruthy: boolean;
    wordContentAnswer: WordContent;
    isGameWithHardsWords: boolean;
    skipLearnedWords: boolean;
  }) {
    const yesBtn = document.querySelector(".sprint__yes") as HTMLButtonElement;
    const noBtn = document.querySelector(".sprint__no") as HTMLButtonElement;

    // const truthyAnswerSound = new Audio("./assets/sounds/truthy-answer.mp3");
    // const falsyAnswerSound = new Audio("./assets/sounds/falsy-answer.mp3");

    yesBtn.addEventListener("click", () => {
      let result: boolean;
      if (isOptionTruthy === true) {
        result = true;
        // truthyAnswerSound.play();
        this.updateStat(result);
      } else {
        result = false;
        // falsyAnswerSound.play();
        this.updateStat(result);
      }

      this.gameData.answers.push({ result, wordContent: wordContentAnswer });

      if (isGameWithHardsWords) {
        this.startRoundWithHardWords();
      } else {
        this.startRound({ skipLearnedWords });
      }
    });

    noBtn.addEventListener("click", () => {
      let result: boolean;
      if (isOptionTruthy === true) {
        result = false;
        // falsyAnswerSound.play();
        this.updateStat(result);
      } else {
        result = true;
        // truthyAnswerSound.play();
        this.updateStat(result);
      }

      this.gameData.answers.push({ result, wordContent: wordContentAnswer });

      if (isGameWithHardsWords) {
        this.startRoundWithHardWords();
      } else {
        this.startRound({ skipLearnedWords });
      }
    });
  }

  startTimer() {
    const timerElem = this.componentElem.querySelector(
      ".sprint__timer"
    ) as HTMLDivElement;

    let secondsGameDuration = 10;
    timerElem.textContent = `${secondsGameDuration}`;

    const intervalId = setInterval(() => {
      timerElem.textContent = `${secondsGameDuration}`;
      const sprintElem = document.querySelector(".sprint") as HTMLDivElement;

      if (secondsGameDuration <= 0) {
        if (sprintElem) {
          this.gameResult.showComponent("sprint", this.gameData.answers);
        }
        clearInterval(intervalId);
      } else if (!sprintElem) {
        clearInterval(intervalId);
      }
      secondsGameDuration -= 1;
    }, 1000);

    this.gameData.intervalId = +`${intervalId}`;
  }

  setSprintStat() {
    const statContainer = this.componentElem.querySelector(".sprint__stat");
    const scoreContainer = statContainer?.querySelector(
      ".sprint__score span"
    ) as HTMLElement;
    const multiplierContainer = statContainer?.querySelector(
      ".sprint__multiplier"
    ) as HTMLElement;
    const currentScoreContainer = statContainer?.querySelector(
      ".sprint__stat-current-score"
    ) as HTMLElement;
    const seriesCountDotsContainer = this.componentElem.querySelector(
      ".dots-container"
    ) as HTMLElement;

    scoreContainer.textContent = ` ${this.gameData.totalScore} `;
    multiplierContainer.textContent = ` ${this.gameData.multiplier} `;
    currentScoreContainer.textContent = ` +${this.gameData.currentScore} `;

    if (this.gameData.seriesCount !== 0) {
      seriesCountDotsContainer
        .querySelector(`.dot:nth-child(${this.gameData.seriesCount})`)
        ?.classList.add("active");
    } else {
      const dots = seriesCountDotsContainer.querySelectorAll(".dot");
      dots.forEach((dot) => dot.classList.remove("active"));
    }
  }

  updateStat(isCorrectAnswer: boolean) {
    if (isCorrectAnswer) {
      this.gameData.totalScore += this.gameData.currentScore;

      if (this.gameData.seriesCount === 3) {
        this.gameData.seriesCount = 0;
        this.gameData.multiplier += 1;
        this.gameData.currentScore += 20;
      } else {
        this.gameData.seriesCount += 1;
      }
    } else {
      this.gameData.seriesCount = 0;
    }

    this.setSprintStat();
  }
}
