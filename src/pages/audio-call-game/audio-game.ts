import { COMPONENT_LOAD_SCREAN } from "../../components/load-screan/load-screan";
import words from "../../controller/services/words";

class AudioCall {
  data: object[];
  page: number;
  wordNumber: number;
  constructor() {
    this.data = [{}];
    this.page = 1;
    this.wordNumber = 1;
  }

  renderRules() {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="audio-call-rules">
          <div class="audio-call-rules__body">
            <div class="audio-call-rules__title">
              АУДИОВЫЗОВ
            </div>
            <div class="audio-call-rules__info">
              <p>«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух.</p>
            </div>
            <ul class="audio-call-rules__list">
              <li class="audio-call-rules__item">Используйте мышь, чтобы выбрать.</li>
              <li class="audio-call-rules__item">Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
              <li class="audio-call-rules__item">Используйте пробел для повтроного звучания слова</li>
              <li class="audio-call-rules__item">Используйте клавишу Enter для подсказки или для перехода к следующему слову
              </li>
            </ul>
            <div class="audio-call-rules__controlls">
              <select name="" id="" class="audio-call-rules__select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <button class="audio-call-rules__button">Начать</button>
            </div>
          </div>
        </div>
    `;
  }
  renderGame() {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="audio-call-game">
    <div class="audio-call-game__body">
      <audio class="audio-call-game__audio" src=""></audio>
      <button class="audio-call-game__play-button"><svg class="MuiSvgIcon-root jss65" fill="#ffffff90" width="150"
          focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z">
          </path>
        </svg>
      </button>
      <div class="audio-call-game__buttons">
        <button class="audio-call-game__button-choice-1 false">Jlby</button>
        <button class="audio-call-game__button-choice-2 true">Ldf</button>
        <button class="audio-call-game__button-choice-3 disable">Nhb</button>
        <button class="audio-call-game__button-choice-4">Xtnsht</button>
        <button class="audio-call-game__button-choice-5">Gznm</button>
      </div>
      <button class="audio-call-game__select">Ytrcn</button>
    </div>
  </div>
    `;
  }

  AudioCallListenerStart() {
    (<HTMLButtonElement>(
      document.querySelector(".audio-call-rules__button")
    )).addEventListener("click", async () => {
      COMPONENT_LOAD_SCREAN.renderLoadScrean();
      const COUNT = Number(
        (<HTMLFormElement>document.querySelector(".audio-call-rules__select"))
          .value
      );
      this.data = await words.getWords({ group: COUNT, page: this.page });
      COMPONENT_LOAD_SCREAN.removeLoadScrean();
      this.renderGame();
      const CLONE_DATA = JSON.stringify(this.data);
      this.treatmentData(JSON.parse(CLONE_DATA));
    });
  }

  treatmentData(data: object[]) {
    console.log(data.sort(() => Math.random() - 0.5));
  }
}

export const AUDIO_CALL_GAME = new AudioCall();
