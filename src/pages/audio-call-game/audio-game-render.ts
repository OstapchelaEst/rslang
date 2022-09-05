import { WordContent } from "../../interfaces/interfaceServerAPI";
import { IStatistic } from "../../interfaces/caudio-call-game";
import { AUDIO_CALL_GAME } from "../../controller/audio-call-game/audio-call-game";
import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import Vocabulary from "../vocabulary/Vocabulary";
import { COMPONENT_HEADER } from "../../components/header/header";
import { COMPONENT_FOOTER } from "../../components/footer/footer";
class AudioCallRender {
  renderFullScreanAudio(block: string) {
    const BLOCK = document.createElement("div");
    BLOCK.classList.add("fullscrea-audio");
    BLOCK.innerHTML = `
    <div class="fullscrea-audio__audio">
      <svg width="30px" class="audio-off" fill="#cdcdcd" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></svg>
      <svg width="30px" class="audio-on" fill="#cdcdcd" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z"></path></svg>
    </div>
    <div class="fullscrea-audio__screan">
      <svg width="30px" class="screan-off" fill="#cdcdcd" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></svg>
      <svg width="30px" class="screan-on" fill="#cdcdcd" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></svg>
    </div>
    `;
    const PARENT_BLOCK = document.querySelector(`.${block}`) as HTMLElement;
    PARENT_BLOCK.prepend(BLOCK);
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
              <li class="audio-call-rules__item">Используйте клавишу Enter для перехода к следующему слову
              </li>
              ${
                LOCAL_STORAGE.getDataUser()
                  ? `
                <li class="audio-call-rules__item">При правильном ответе слово будет помечено как изученное
                </li>
                <li class="audio-call-rules__item">Если вы сделаете неверный ответ на уже изученном слове оно перестанет быть изученным
                </li>
                `
                  : ``
              }
            </ul>
            <div class="audio-call-rules__controlls">
            <p class="audio-call-rules__complexity">Сложность</p>
            <select name="" id="" class="audio-call-rules__select">
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
              <option value="4">5</option>
              <option value="5">6</option>
            </select>
              <button class="audio-call-rules__button">Начать</button>
            </div>
          </div>
        </div>
    `;
    this.renderFullScreanAudio("audio-call-rules");
    this.AddListenerAudio();
    this.AddListenerScrean();
  }

  renderGame(data: WordContent[], numbersWords: number[], numberWord: number) {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
      <div class="audio-call-game">
      <div class="audio-call-game__body">
        <audio class="audio-call-game__audio-false" src="https://zvukitop.com/wp-content/uploads/2021/08/icq-oshybka.mp3"></audio>
        <audio class="audio-call-game__audio-true" src="https://zvukipro.com/uploads/files/2020-11/1604628139_d0d8bbb34c203ff.mp3"></audio>
        <audio class="audio-call-game__audio" src="https://rs-learnwords-example.herokuapp.com/${data[numberWord].audio}"></audio>
        <div class="audio-call-game__visual">
          <div class="audio-call-game__picture">
          <img src="https://rs-learnwords-example.herokuapp.com/${data[numberWord].image}" class="audio-call-game__img">
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
    
        </div>
        <button class="audio-call-game__select">Следующее слово</button>
      </div>
    </div>
      `;
    const BUTTONS = document.querySelector(
      ".audio-call-game__buttons"
    ) as HTMLElement;
    let count = 1;
    numbersWords.forEach((e) => {
      BUTTONS.innerHTML += `
        <button data-choise="${this.setTrueOrFalse(
          numberWord,
          e
        )}" class="audio-call-game__button-choice-${count}">${
        data[e].wordTranslate
      }</button>
        `;
      count++;
    });
    this.renderFullScreanAudio("audio-call-game");
    this.AddListenerAudio();
    this.AddListenerScrean();
  }

  renderFinish(
    dataStats: IStatistic[],
    trueChoise: number,
    falseChoise: number
  ) {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="audio-call-finish">
    <div class="audio-call-finish__body">
    <div class="audio-call-finish__title">Результат!</div>
    <div class="audio-call-finish__true">
      <div class="audio-call-finish__sub-title">Правильные ответов ${trueChoise}</div>
      <ol class="audio-call-finish__list">
      </ol>
    </div>
    <div class="audio-call-finish__false">
      <div class="audio-call-finish__sub-title">Неправильных ответов ${falseChoise}</div>
      <ol class="audio-call-finish__list">
      </ol>
    </div>
    <div class="audio-call-finish__controlls">
      <button class="audio-call-finish__repeat">Повторить</button>
      <a href="#/all-games" data-navigo class="audio-call-finish__games">Другие игры</a>
    </div>
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
    dataStats.forEach((e) => {
      const BLOCK: HTMLLIElement = document.createElement("li");
      BLOCK.classList.add("audio-call-finish__item");
      BLOCK.textContent = `${e.word} - ${e.wordTranslate}`;
      if (e.choise === true) {
        TRUE_LIST.append(BLOCK);
      } else {
        FALSE_LIST.append(BLOCK);
      }
    });
    this.renderFullScreanAudio("audio-call-finish");
    this.AddListenerAudio();
    this.AddListenerScrean();
  }

  renderMoveOn() {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="audio-call-move-on">
      <div class="audio-call-move-on__body">
       <div class="audio-call-move-on__title">Вам пора двигаться дальше!</div>
       <div class="audio-call-move-on__sub-title">Вы уже изучили все слова на этой и предыдуших страницах. Так держать :)</div>
       <a href="#/vocabulary" data-navigo class="audio-call-move-on__button">Вернуться к учебнику</a>
      </div>
    </div>
    `;
    (<HTMLElement>(
      document.querySelector(".audio-call-move-on__button")
    )).addEventListener("click", this.returnToVocabularu);
  }

  renderNoDifficultWords() {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="audio-call-move-on">
      <div class="audio-call-move-on"__body">
       <div class="audio-call-move-on__title">У вас нет ни одного сложного слова!</div>
       <div class="audio-call-move-on__sub-title">Добавбте их сами из учебника или совершите ошибку в мини-игре и слово добавиться автоматически</div>
       <a href="#/vocabulary" data-navigo class="audio-call-move-on__button">Вернуться к учебнику</a>
      </div>
    </div>
    `;
    (<HTMLElement>(
      document.querySelector(".audio-call-move-on__button")
    )).addEventListener("click", this.returnToVocabularu);
  }

  setTrueOrFalse(value: number, valueTwo: number) {
    return value === valueTwo ? "true" : "false";
  }

  AddListenerAudio() {
    const BLOCK = document.querySelector(
      ".fullscrea-audio__audio"
    ) as HTMLElement;
    const MAIN = document.querySelector(".main") as HTMLElement;
    BLOCK.addEventListener("click", () => {
      MAIN.classList.toggle("audio-false");
      MAIN.classList.contains("audio-false")
        ? (AUDIO_CALL_GAME.statusAudio = "audio-false")
        : (AUDIO_CALL_GAME.statusAudio = "");
    });
  }

  AddListenerScrean() {
    const BLOCK = document.querySelector(
      ".fullscrea-audio__screan"
    ) as HTMLElement;
    const MAIN = document.querySelector(".main") as HTMLElement;
    BLOCK.addEventListener("click", () => {
      MAIN.classList.toggle("screan-false");
      MAIN.classList.contains("screan-false")
        ? (AUDIO_CALL_GAME.statusScrean = "screan-false")
        : (AUDIO_CALL_GAME.statusScrean = "");
      document.fullscreenElement
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen();
    });
  }

  async returnToVocabularu() {
    const container: HTMLElement | null =
      document.querySelector(".main__container");

    if (!container) return;

    const vocabulary: Vocabulary = new Vocabulary();
    await vocabulary.render();

    COMPONENT_HEADER.createHeader();

    container.innerHTML = "";
    container.append(vocabulary.el);

    COMPONENT_FOOTER.createFooter();
  }
}

export const AUDIO_CALL_RENDER = new AudioCallRender();
