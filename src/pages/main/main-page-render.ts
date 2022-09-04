import { SVG } from "./svg-pictures";
import { TEAM_TEXT, FUNCTIONAL_TEXT } from "./block-text";
import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import { SING_IN_MODAL_WINDOW } from "../../components/header/sing-in-modal-window";

class MainPage {
  renderStartPage() {
    if (document.querySelector(".start-page")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("start-page");
    PAGE.innerHTML = `
   <div class="start-page">
   <div class="start-page__body">
      <div class="start-page__img-1">
      ${SVG.decorationOne}
      </div>
      <div class="start-page__img-2">
         
      </div>      
      <div class="start-page__info">
         <h1 class="start-page__title">Выучи английский язык вместе с RS-lang</h1>
         <h3 class="start-page__subtitle">Нескучное онлайн-обучение английскому языку с помощью игр и интересных
            заданий в любое удобное для вас время!</h3>
         <p class="start-page__text">Библиотека из 4-х тысяч слов, которые можно отсортировать по популярности и
            сложности.</p>
            <div class="start-page__chips">
            <h4>У нас есть:</h4>
               <ul class="start-page__list">
                  <li class="start-page__item">Мини-игры</li>
                  <li class="start-page__item">Уровни сложности</li>
                  <li class="start-page__item">Словарь</li>
                  <li class="start-page__item">Статистика</li>
               </ul>
            </div>
      </div>
   </div>
</div>`;
    (<HTMLElement>document.querySelector(".main__container")).prepend(PAGE);
  }

  renderTeamPage() {
    if (document.querySelector(".team-page")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("team-page");
    PAGE.innerHTML = `            
    <div class="team-page">
      <h3 class="team-page__title">Наша команда</h3>
      <div class="team-page__body">   
      </div>
      <p class="team-page__sub-text">
         Вместе мы трудились не покладая рук, чтоб ты смог учть англйиский комфортно и весело!
      </p>
   </div>`;
    (<HTMLElement>document.querySelector(".main__container")).append(PAGE);
    const TEAM_BODY = document.querySelector(".team-page__body");
    for (const key in TEAM_TEXT) {
      const BLOCK = document.createElement("div");
      BLOCK.classList.add("team-page__item");
      BLOCK.innerHTML = `
      <div class="team-page__picture">
         <img class="team-page__img"
            src="${
              TEAM_TEXT[key as keyof typeof TEAM_TEXT].gitImg
            }" alt="git picture">
      </div>
      <h4 class="team-page__sub-title">${
        TEAM_TEXT[key as keyof typeof TEAM_TEXT].prevNameText
      }
         <a href="${
           TEAM_TEXT[key as keyof typeof TEAM_TEXT].gitLink
         }" target="_blank">${TEAM_TEXT[key as keyof typeof TEAM_TEXT].name}</a>
      </h4>
      <p class="team-page__text">
      ${TEAM_TEXT[key as keyof typeof TEAM_TEXT].text}
      </p>
      `;
      (<HTMLElement>TEAM_BODY).append(BLOCK);
    }
  }

  renderFunctionalPage() {
    const USER_DATA = LOCAL_STORAGE.getDataUser();
    if (document.querySelector(".functional")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("functional");
    PAGE.innerHTML = `
    
      <h3 class="functional__title">Функционал</h3>
      <p class="functional__info">Зарегестрируйся, чтоб получить все возможности</p>
      <div class="functional__body">
      </div>
    `;
    (<HTMLElement>document.querySelector(".main__container")).append(PAGE);
    const FUNCTIONA_BODY = document.querySelector(".functional__body");
    for (const key in FUNCTIONAL_TEXT) {
      const AUTHORIZATION =
        FUNCTIONAL_TEXT[key as keyof typeof FUNCTIONAL_TEXT].authorization;
      const BLOCK = document.createElement("div");
      BLOCK.classList.add("functional__item");
      BLOCK.innerHTML = `
      <div class="functional__sub-title">${
        FUNCTIONAL_TEXT[key as keyof typeof FUNCTIONAL_TEXT].title
      }</div>
      <div class="functional__text">
            ${FUNCTIONAL_TEXT[key as keyof typeof FUNCTIONAL_TEXT].text}
      </div>
      ${
        AUTHORIZATION
          ? USER_DATA
            ? ``
            : `<div class="functional__authorization">Нужно авторизироваться</div>`
          : ``
      }
      <div class="functional__link">
         <a href="${
           FUNCTIONAL_TEXT[key as keyof typeof FUNCTIONAL_TEXT].link
         }" data-navigo class="functional-link ${
        AUTHORIZATION ? (USER_DATA ? `` : `disable`) : ``
      }">Открыть</a>
      </div>
      `;
      (<HTMLElement>FUNCTIONA_BODY).append(BLOCK);
    }
  }

  addListenersNoAuthorization() {
    const ALL_DISABLE_LINKS = document.querySelectorAll(
      ".functional-link.disable"
    );
    ALL_DISABLE_LINKS.forEach((e) => {
      (<HTMLElement>e.parentElement).addEventListener(
        "click",
        SING_IN_MODAL_WINDOW.singInModalWindow
      );
    });
  }

  async buildMainPage() {
    this.renderStartPage();
    this.renderFunctionalPage();
    this.renderTeamPage();
    this.addListenersNoAuthorization();
  }
}
export const RENDER_BASIC_STRUCTURE = new MainPage();
