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
         <a href="/" class="header__logo" data-navigo><span>RS-lang</span>  
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
    const ALL_LINKS = document.querySelectorAll(".menu__link");
    ALL_LINKS.forEach((e) => {
      (<HTMLElement>e).addEventListener("click", this.removeLockAndOpenClass);
    });
    (<HTMLElement>document.querySelector(".header__logo")).addEventListener(
      "click",
      this.removeLockAndOpenClass
    );
  }

  removeLockAndOpenClass() {
    if (document.documentElement.classList.contains("_lock")) {
      document.documentElement.classList.remove("_lock");
    }
    if (document.documentElement.classList.contains("menu-open")) {
      document.documentElement.classList.remove("menu-open");
    }
  }

  renderSingIn() {
    const MODAL = document.createElement("div");
    MODAL.classList.add("sing-in");
    MODAL.innerHTML = `
   <div class="sing-in__body">
        <div class="sing-in__close">
        <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"/></svg>
        </div>
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
    (<HTMLElement>document.querySelector(".sing-in__body")).innerHTML = `
    <div class="sing-in__close">
    <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"/></svg>
    </div>
    <p class="sing-in__title">Регистрация</p>
      <form action="#" class="registration__form">
      <label for="email" class="false">Email*</label>
      <input required  type="email" autocomplete="on" id="email" class="registration__input-email">
      
      <label for="name" class="false">Имя*</label>
      <input required type="text" autocomplete="on" id="name" class="registration__input-name">
      
      <label for="password-1" class="false">Пароль*</label>
      <input required placeholder="Не менее 8 символов" type="password" id="password-1"  class="registration__input-password-1">
      
      <label for="password-2" class="false">Повторите пароль*</label>
      <input required placeholder="Не менее 8 символов" type="password" id="password-2"  class="registration__input-password-2">
      
      <button type="submit"  class="registration__input-button disable">Зарегистрироваться</button>
   </form>`;
  }
  renderCompliteRegistration() {
    (<HTMLElement>document.querySelector(".sing-in__body")).innerHTML = `
    <div class="sing-in__close">
    <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"/></svg>
    </div>
    <div class="sing-in__title"><p>Регистрация прошла успешно!</p></div>
    <button class="sing-in__button-close">Закрыть</button>
    `;
  }
  renderErrorRegistration() {
    (<HTMLElement>document.querySelector(".sing-in__body")).innerHTML = `
    <div class="sing-in__close">
    <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"/></svg>
    </div>
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
