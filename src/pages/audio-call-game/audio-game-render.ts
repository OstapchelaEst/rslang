import { WordContent } from "../../interfaces/interfaceServerAPI";
import { IStatistic } from "../../interfaces/caudio-call-game";
class AudioCallRender {
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
              <li class="audio-call-rules__item">Используйте клавишу Enter для перехода к следующему слову
              </li>
            </ul>
            <div class="audio-call-rules__controlls">
            <p class="audio-call-rules__complexity">Сложность</p>
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

  renderGame(data: WordContent[], numbersWords: number[], numberWord: number) {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
      <div class="audio-call-game">
      <div class="audio-call-game__body">
        <audio class="audio-call-game__audio-false" src="https://zvukitop.com/wp-content/uploads/2021/08/icq-oshybka.mp3"></audio>
        <audio class="audio-call-game__audio-true" src="https://zvukipro.com/uploads/files/2020-11/1604628139_d0d8bbb34c203ff.mp3"></audio>
        <audio class="audio-call-game__audio" src="https://rs-learnwords-example.herokuapp.com/${
          data[numberWord].audio
        }"></audio>
        <div class="audio-call-game__visual">
          <div class="audio-call-game__picture">
          <img src="https://rs-learnwords-example.herokuapp.com/${
            data[numberWord].image
          }" class="audio-call-game__img">
        </div>
        <div class="audio-call-game__show">
        <button class="audio-call-game__play-button"><svg fill="#ffffff90"
            focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z">
            </path>
          </svg>
        </button>
        <span class="audio-call-game__word">${data[numberWord].word}</span>
        </div>
        </div>
        <div class="audio-call-game__buttons">
          <button data-choise="${this.setTrueOrFalse(
            numberWord,
            numbersWords[0]
          )}" class="audio-call-game__button-choice-1">${
      data[numbersWords[0]].wordTranslate
    }</button>
          <button data-choise="${this.setTrueOrFalse(
            numberWord,
            numbersWords[1]
          )}" class="audio-call-game__button-choice-2">${
      data[numbersWords[1]].wordTranslate
    }</button>
          <button data-choise="${this.setTrueOrFalse(
            numberWord,
            numbersWords[2]
          )}" class="audio-call-game__button-choice-3">${
      data[numbersWords[2]].wordTranslate
    }</button>
          <button data-choise="${this.setTrueOrFalse(
            numberWord,
            numbersWords[3]
          )}" class="audio-call-game__button-choice-4">${
      data[numbersWords[3]].wordTranslate
    }</button>
          <button data-choise="${this.setTrueOrFalse(
            numberWord,
            numbersWords[4]
          )}" class="audio-call-game__button-choice-5">${
      data[numbersWords[4]].wordTranslate
    }</button>
        </div>
        <button class="audio-call-game__select">Следующее слово</button>
      </div>
    </div>
      `;
  }

  renderFinish(dataStats: IStatistic[]) {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="audio-call-finish">
    <div class="audio-call-finish__title">Результат</div>
    <div class="audio-call-finish__true">
      <div class="audio-call-finish__sub-title">Правильные ответов </div>
      <ol class="audio-call-finish__list">
      </ol>
    </div>
    <div class="audio-call-finish__false">
      <div class="audio-call-finish__sub-title">Неправильных ответов </div>
      <ol class="audio-call-finish__list">
      </ol>
    </div>
    <div class="audio-call-finish__controlls">
      <button class="audio-call-finish__repeat">Повторить</button>
      <a class="audio-call-finish__games">Другие игры</a>
    </div>
  </div>
    `;
    const TRUE_LIST = <HTMLElement>(
      document.querySelector(
        ".audio-call-finish__true .audio-call-finish__list"
      )
    );
    const FALSE_LIST = <HTMLElement>(
      document.querySelector(
        ".audio-call-finish__false .audio-call-finish__list"
      )
    );
    let TRUE_CHOISE = 0;
    let FALSE_CHOISE = 0;
    const FALSE_LIST_TITLE = document.querySelector(
      ".audio-call-finish__false .audio-call-finish__sub-title"
    );
    const TRUE_LIST_TITLE = document.querySelector(
      ".audio-call-finish__true .audio-call-finish__sub-title"
    );
    dataStats.forEach((e) => {
      const BLOCK: HTMLLIElement = document.createElement("li");
      BLOCK.classList.add("audio-call-finish__item");
      BLOCK.textContent = `${e.word} - ${e.wordTranslate}`;

      if (e.choise === true) {
        TRUE_LIST.append(BLOCK);
        ++TRUE_CHOISE;
      } else {
        FALSE_LIST.append(BLOCK);
        ++FALSE_CHOISE;
      }
    });
    (<HTMLElement>FALSE_LIST_TITLE).innerHTML += `${FALSE_CHOISE}`;
    (<HTMLElement>TRUE_LIST_TITLE).innerHTML += `${TRUE_CHOISE}`;
  }

  setTrueOrFalse(value: number, valueTwo: number) {
    return value === valueTwo ? "true" : "false";
  }
}

export const AUDIO_CALL_RENDER = new AudioCallRender();
