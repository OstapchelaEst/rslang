import { VALIDATION } from "./validation";
import { AUTHORIZATION } from "./authorization";
import { COMPONENT_HEADER } from "./header";

class SingInModalWindow {
  singInListener() {
    const BUTTON = document.querySelector(
      ".menu__link-registration"
    ) as HTMLButtonElement;
    BUTTON.addEventListener("click", SING_IN_MODAL_WINDOW.singInModalWindow);
    BUTTON.textContent = `Войти`;
  }

  async singInModalWindow() {
    COMPONENT_HEADER.renderSingIn();
    SING_IN_MODAL_WINDOW.registrationModalWindow();
    SING_IN_MODAL_WINDOW.closeModalWindowListener();
    AUTHORIZATION.AuthorizationListener();
    ("Хочу зайти в аккаунт!");
  }

  registrationModalWindow() {
    (<HTMLElement>(
      document.querySelector(".sing-in__registration")
    )).addEventListener("click", () => {
      COMPONENT_HEADER.renderRegistration();
      VALIDATION.validationListeners();
    });
  }

  closeModalWindowListener() {
    (<HTMLElement>document.querySelector(".sing-in")).addEventListener(
      "mousedown",
      (e) => {
        if ((<HTMLElement>e.target).classList.contains("sing-in")) {
          this.closeModalWindow();
        }
      }
    );
  }

  closeModalWindow() {
    (<HTMLElement>document.querySelector(".sing-in")).classList.remove(
      "active"
    );
    setTimeout(() => {
      (<HTMLElement>document.querySelector(".sing-in")).remove();
    }, 300);
  }
}

export const SING_IN_MODAL_WINDOW = new SingInModalWindow();
