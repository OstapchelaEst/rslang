import { User } from "../../interfaces/interfaceServerAPI";
import { COMPONENT_LOAD_SCREAN } from "../../components/load-screan/load-screan";
import user from "../../controller/services/users";
import { SING_IN_MODAL_WINDOW } from "./sing-in-modal-window";
import { VALIDATION } from "./validation";
import { COMPONENT_HEADER } from "./header";

class Registration {
  registrationnButton(event: Event) {
    const MAIL = VALIDATION.validationEmail();
    const NAME = VALIDATION.validationName();
    const PASSWORD = VALIDATION.validationPassword();
    if (MAIL && NAME && PASSWORD) {
      event.preventDefault();
      REGISTRATION.registrationUser({
        name: NAME,
        email: MAIL,
        password: PASSWORD,
      });
    }
  }

  async registrationUser(obj: User) {
    COMPONENT_LOAD_SCREAN.renderLoadScrean();
    await user
      .createUser(obj)
      .then(() => {
        COMPONENT_LOAD_SCREAN.removeLoadScrean();
        COMPONENT_HEADER.renderCompliteRegistration();
        (<HTMLElement>(
          document.querySelector(".sing-in__button-close")
        )).addEventListener("click", () => {
          SING_IN_MODAL_WINDOW.closeModalWindowListener();
        });
      })
      .catch(() => {
        COMPONENT_LOAD_SCREAN.removeLoadScrean();
        COMPONENT_HEADER.renderErrorRegistration();
        this.toRetryButton();
      });
  }

  toRetryButton() {
    (<HTMLElement>(
      document.querySelector(".sing-in__button-to-retry")
    )).addEventListener("click", async () => {
      await COMPONENT_HEADER.renderRegistration();
      await VALIDATION.validationListeners();
    });
  }
}

export const REGISTRATION = new Registration();
