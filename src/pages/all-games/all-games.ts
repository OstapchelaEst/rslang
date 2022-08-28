import { SVG } from "../svg";

class AllGamesPage {
  renderPage() {
    (<HTMLElement>document.querySelector(".main__container")).innerHTML = `
    <div class="all-games">
    <div class="all-games__body">
      <div class="all-games__title">Мини-игры</div>
      <div class="all-games__inner">
        <div class="all-games__item">
          <div class="all-games__pictyre">
          ${SVG.sprint}
          </div>
          <div class="all-games__sub-title">
            Спринт
          </div>
          <div class="all-games__text">
            Проверьте, сколько очков вы можете получить за одну минуту, делая выбор о том, что правильно, а что нет.
          </div>
          <a href="/all-games/sprint" class="all-games__button" data-navigo>Играть!</a>
        </div>
        <div class="all-games__item">
          <div class="all-games__pictyre">
            ${SVG.audioCall}
          </div>
          <div class="all-games__sub-title">
            Аудиовызов
          </div>
          <div class="all-games__text">
            Проверьте свои навыки восприятия английского на слух, пытаясь подобрать правильное значение после услышанного слова.
          </div>
          <a href="/all-games/audio-call" class="all-games__button" data-navigo>Играть!</a>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

export const ALL_GAME_PAGE = new AllGamesPage();
