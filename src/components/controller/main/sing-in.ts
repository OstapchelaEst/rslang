import { RENDER_BASIC_STRUCTURE } from "../../pages/main/main-page-render";

class User {
  singInModalWindow = () => {
    (<HTMLElement>(
      document.querySelector(".menu__link-registration")
    )).addEventListener("click", async () => {
      await RENDER_BASIC_STRUCTURE.singIn();
      this.registrationModalWindow();
      this.closeModalWindow();
    });
  };

  registrationModalWindow() {
    (<HTMLElement>(
      document.querySelector(".sing-in__registration")
    )).addEventListener("click", () => {
      RENDER_BASIC_STRUCTURE.registration();
    });
  }

  closeModalWindow() {
    (<HTMLElement>document.querySelector(".sing-in")).addEventListener(
      "click",
      (e) => {
        if ((<HTMLElement>e.target).classList.contains("sing-in")) {
          (<HTMLElement>document.querySelector(".sing-in")).classList.remove(
            "active"
          );
          setTimeout(() => {
            (<HTMLElement>document.querySelector(".sing-in")).remove();
          }, 300);
        }
      }
    );
  }
}

export const USER = new User();
