import { SVG } from "./svg-pictures";
import { TEAM_TEXT, FUNCTIONAL_TEXT } from "./block-text";

class RenderBasicStructure {
  header() {
    if (document.querySelector(".header")) return;
    const HEADER = document.createElement("header");
    HEADER.classList.add("header");
    HEADER.innerHTML = `
      <div class="header__container">
      <div class="header__menu menu"> 
         <a href="" class="header__logo" data-navigo><span>RS-lang</span>  
        ${SVG.book}</a>
         <button type="button" class="menu__icon icon-menu"><span></span></button>
         <nav class="menu__body">
            <ul class="menu__list">
               <li class="menu__item"><a href="/about/contacts" class="menu__link" data-navigo>Наша команда</a></li>
               <li class="menu__item"><a href="" class="menu__link">Учебник</a></li>
               <li class="menu__item"><a href="" class="menu__link">Игры</a></li>
               <li class="menu__item"><a href="" class="menu__link">Статистика</a></li>
               <li class="menu__item"><button type="button" class="menu__link-registration">Войти</button></li>
            </ul>
         </nav>
      </div>
   </div>
      `;
    (<HTMLElement>document.querySelector(".wrapper")).prepend(HEADER);
  }

  footer() {
    if (document.querySelector(".footer")) return;
    const FOOTER = document.createElement("footer");
    FOOTER.classList.add("footer");
    FOOTER.innerHTML = `
   <div class="footer__container">
   <ul class="footer__list">
      <li class="footer__item ">
         ${SVG.gitIcon}
         <a href="${TEAM_TEXT.dima.gitLink}" target="_blank">Дима</a>
         <a href="${TEAM_TEXT.lena.gitLink}" target="_blank">Лена</a>
         <a href="${TEAM_TEXT.kirill.gitLink}" target="_blank">Кирилл</a>
         <a href="${TEAM_TEXT.artem.gitLink}" target="_blank">Артём</a>
      </li>
      <li class="footer__item">
         <span>© 2022</span>
      </li>
      <li class="footer__item">
         <a href="https://rs.school/js/" target="_blank">
            <img class="footer__logo" src="https://rs.school/images/rs_school_js.svg" alt="Logo RS school">
         </a>
      </li>
   </ul>
</div>`;
    (<HTMLElement>document.querySelector(".wrapper")).append(FOOTER);
  }

  startPage() {
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

  teamPage() {
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

  functionalPage() {
    if (document.querySelector(".functional")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("functional");
    PAGE.innerHTML = `
    <div class="functional">
      <h3 class="functional__title">Функционал</h3>
      <p class="functional__info">Зарегестрируйся, чтоб получить все возможности</p>
      <div class="functional__body">
      </div>
    </div>
    `;
    (<HTMLElement>document.querySelector(".main__container")).append(PAGE);
    const FUNCTIONA_BODY = document.querySelector(".functional__body");
    for (const key in FUNCTIONAL_TEXT) {
      const BLOCK = document.createElement("div");
      BLOCK.classList.add("functional__item");
      BLOCK.innerHTML = `
      <div class="functional__sub-title">${
        FUNCTIONAL_TEXT[key as keyof typeof FUNCTIONAL_TEXT].title
      }</div>
      <div class="functional__text">
            ${FUNCTIONAL_TEXT[key as keyof typeof FUNCTIONAL_TEXT].text}
      </div>
      <div class="functional__link">
         <a href="">Открыть</a>
      </div>
      `;
      (<HTMLElement>FUNCTIONA_BODY).append(BLOCK);
    }
  }

  singIn() {
    const MODAL = document.createElement("div");
    MODAL.classList.add("sing-in");
    MODAL.innerHTML = `
   <div class="sing-in__body">
                  <p class="sing-in__title">Вход в аккаунт</p>
                  <form action="#" class="sing-in__form">
                     <label for="email">Email*</label>
                     <input type="email" autocomplete="on" id="email" class="sing-in__input-email">
                     <label for="password">Пароль*</label>
                     <input type="password" id="password"  class="sing-in__input-password">
                     <p>Ещё не <span class="sing-in__registration">зарегистрировался?</span></p>
                     <button type="submit"  class="sing-in__input-button">Войти</button>
                  </form>
               </div>
   `;
    document.body.append(MODAL);
    setTimeout(() => {
      (<HTMLElement>document.querySelector(".sing-in")).classList.add("active");
    }, 0);
  }

  registration() {
    (<HTMLElement>(
      document.querySelector(".sing-in__body")
    )).innerHTML = `<p class="sing-in__title">Регистрация</p>
      <form action="#" class="registration__form">
      <label for="email">Email*</label>
      <input type="email" autocomplete="on" id="email" class="registration__input-email">
      <label for="name">Имя*</label>
      <input type="text" autocomplete="on" id="name" class="registration__input-email">
      <label for="password-1">Пароль*</label>
      <input type="password" id="password-1"  class="registration__input-password-1">
      <label for="password">Повторите пароль*</label>
      <input type="password-2" id="password-2"  class="registration__input-password-2">
      <button type="submit"  class="registration__input-button">Зарегистрироваться</button>
   </form>`;
  }

  buildMainPage() {
    this.header();
    this.footer();
    this.startPage();
    this.functionalPage();
    this.teamPage();
  }
}
export const RENDER_BASIC_STRUCTURE = new RenderBasicStructure();
