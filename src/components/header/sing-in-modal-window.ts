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
    document.documentElement.classList.add("_lock");
    COMPONENT_HEADER.renderSingIn();
    SING_IN_MODAL_WINDOW.registrationModalWindow();
    SING_IN_MODAL_WINDOW.closeModalWindowListener();
    AUTHORIZATION.AuthorizationListener();
    SING_IN_MODAL_WINDOW.addCloseModalIcon();
  }

  registrationModalWindow() {
    (<HTMLElement>(
      document.querySelector(".sing-in__registration")
    )).addEventListener("click", () => {
      COMPONENT_HEADER.renderRegistration();
      VALIDATION.validationListeners();
      SING_IN_MODAL_WINDOW.addCloseModalIcon();
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
    document.documentElement.classList.remove("_lock");
    (<HTMLElement>document.querySelector(".sing-in")).classList.remove(
      "active"
    );
    setTimeout(() => {
      (<HTMLElement>document.querySelector(".sing-in")).remove();
    }, 300);
  }

  addCloseModalIcon() {
    (<HTMLElement>document.querySelector(".sing-in__close")).addEventListener(
      "click",
      SING_IN_MODAL_WINDOW.closeModalWindow
    );
  }

  addListenerReturnToSingIn() {
    document
      .querySelector(".sing-in__button-return-to-sing-in")
      ?.addEventListener("click", () => {
        COMPONENT_HEADER.renderSingInAfterRegistration();
        SING_IN_MODAL_WINDOW.registrationModalWindow();
        SING_IN_MODAL_WINDOW.closeModalWindowListener();
        AUTHORIZATION.AuthorizationListener();
        SING_IN_MODAL_WINDOW.addCloseModalIcon();
      });
  }
}

export const SING_IN_MODAL_WINDOW = new SingInModalWindow();
