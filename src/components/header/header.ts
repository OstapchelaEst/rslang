import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import { SVG } from "../../pages/main/svg-pictures";
import { AUTHORIZATION } from "./authorization";
import { SING_IN_MODAL_WINDOW } from "./sing-in-modal-window";

class ComponentHeader {
  renderHeader() {
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
               <li class="menu__item"><a href="/" data-navigo class="menu__link">Наша команда</a></li>
               <li class="menu__item"><a href="/vocabulary" data-navigo class="menu__link">Учебник</a></li>
               <li class="menu__item"><a href="/all-games" data-navigo class="menu__link">Игры</a></li>
               <li class="menu__item"><a href="" class="menu__link">Статистика</a></li>
               <li class="menu__item"><button type="button" class="menu__link-registration">${
                 LOCAL_STORAGE.getDataUser() === null ? "Войти" : "Выйти"
               }</button></li>
            </ul>
         </nav>
      </div>
   </div>
      `;
    (<HTMLElement>document.querySelector(".wrapper")).prepend(HEADER);
  }
  openBurgerMenu() {
    (<HTMLButtonElement>(
      document.querySelector(".menu__icon ")
    )).addEventListener("click", () => {
      document.documentElement.classList.toggle("_lock");
      document.documentElement.classList.toggle("menu-open");
    });
  }
  renderSingIn() {
    const MODAL = document.createElement("div");
    MODAL.classList.add("sing-in");
    MODAL.innerHTML = `
   <div class="sing-in__body">
       <p class="sing-in__title">Вход в аккаунт</p>
       <form action="#" class="sing-in__form">
        <label for="email">Email*</label>
        <input required type="email" autocomplete="on" id="email" class="sing-in__input-email">
        <label for="password">Пароль*</label>
        <input required type="password" id="password"  class="sing-in__input-password">
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
  renderRegistration() {
    (<HTMLElement>(
      document.querySelector(".sing-in__body")
    )).innerHTML = `<p class="sing-in__title">Регистрация</p>
      <form action="#" class="registration__form">
      <label for="email" class="false">Email*</label>
      <input required  type="email" autocomplete="on" id="email" class="registration__input-email">
      
      <label for="name" class="false">Имя*</label>
      <input required type="text" autocomplete="on" id="name" class="registration__input-name">
      
      <label for="password-1" class="false">Пароль*</label>
      <input required type="password" id="password-1"  class="registration__input-password-1">
      
      <label for="password-2" class="false">Повторите пароль*</label>
      <input required type="password" id="password-2"  class="registration__input-password-2">
      
      <button type="submit"  class="registration__input-button disable">Зарегистрироваться</button>
   </form>`;
  }
  renderCompliteRegistration() {
    (<HTMLElement>document.querySelector(".sing-in__body")).innerHTML = `
    <div class="sing-in__title"><p>Регистрация прошла успешно!</p></div>
    <button class="sing-in__button-close">Закртыть</button>
    `;
  }
  renderErrorRegistration() {
    (<HTMLElement>document.querySelector(".sing-in__body")).innerHTML = `
    <div class="sing-in__title"><p>Пользователь с таикм email уже зарегистрирован</p></div>
    <button class="sing-in__button-to-retry">Попробовать ещё раз</button>
    `;
  }
  renderErrorAutorization() {
    if (document.querySelector(".sing-in__error")) return;
    const BLOCK = document.createElement("p");
    BLOCK.classList.add("sing-in__error");
    BLOCK.textContent = `Неверный логин или пароль`;
    (<HTMLElement>document.querySelector(".sing-in__form")).prepend(BLOCK);
  }

  async createHeader() {
    if (document.querySelector(".header")) return;
    this.renderHeader();
    this.openBurgerMenu();
    (await LOCAL_STORAGE.getDataUser()) === null
      ? SING_IN_MODAL_WINDOW.singInListener()
      : AUTHORIZATION.unAutorizationListener();
  }
}

export const COMPONENT_HEADER = new ComponentHeader();
