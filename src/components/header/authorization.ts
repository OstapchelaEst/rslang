import { User } from "../../interfaces/interfaceServerAPI";
import { COMPONENT_LOAD_SCREAN } from "../load-screan/load-screan";
import { LOCAL_STORAGE } from "../../controller/local-storage/local-storage";
import { signIn } from "../../controller/services/singIn";
import { SING_IN_MODAL_WINDOW } from "./sing-in-modal-window";
import { COMPONENT_HEADER } from "./header";

class Authorization {
  AuthorizationListener() {
    (<HTMLButtonElement>(
      document.querySelector(".sing-in__input-button")
    )).addEventListener("click", (e) => {
      this.AuthorizationUser(e);
    });
  }
  AuthorizationUser(event: Event) {
    const MAIL = (<HTMLInputElement>(
      document.querySelector(".sing-in__input-email")
    )).value;
    const PASSWORD = (<HTMLInputElement>(
      document.querySelector(".sing-in__input-password")
    )).value;
    if (MAIL && PASSWORD) {
      event.preventDefault();
      this.AutorizationRequest({ email: MAIL, password: PASSWORD });
    }
  }
  async AutorizationRequest(obj: User) {
    const BUTTON = document.querySelector(
      ".menu__link-registration"
    ) as HTMLButtonElement;
    COMPONENT_LOAD_SCREAN.renderLoadScrean();
    await signIn
      .signIn(obj)
      .then((data) => {
        console.log(BUTTON);

        BUTTON.removeEventListener(
          "click",
          SING_IN_MODAL_WINDOW.singInListener
        );
        SING_IN_MODAL_WINDOW.closeModalWindow();
        LOCAL_STORAGE.setUserData(data);
        COMPONENT_LOAD_SCREAN.removeLoadScrean();
        this.unAutorizationListener();
        BUTTON.textContent = `Выйти`;
        console.log("Зашёл в аккаунт!");
      })
      .catch(() => {
        COMPONENT_HEADER.renderErrorAutorization();
        COMPONENT_LOAD_SCREAN.removeLoadScrean();
      });
  }
  unAutorizationListener() {
    (<HTMLButtonElement>(
      document.querySelector(".menu__link-registration")
    )).addEventListener("click", AUTHORIZATION.unAutorization);
  }
  unAutorization() {
    const BUTTON = document.querySelector(
      ".menu__link-registration"
    ) as HTMLButtonElement;
    BUTTON.textContent = `Войти`;
    BUTTON.removeEventListener("click", AUTHORIZATION.unAutorization);
    LOCAL_STORAGE.removeDataUser();
    SING_IN_MODAL_WINDOW.singInListener();
    console.log("Вышел из аккаунта!");
  }
}

export const AUTHORIZATION = new Authorization();
