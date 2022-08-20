import { RENDER_BASIC_STRUCTURE } from "../../pages/main/main-page-render";

class User {
  singInModalWindow = () => {
    (<HTMLElement>(
      document.querySelector(".menu__link-registration")
    )).addEventListener("click", async () => {
      console.log("aaaaa");
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
          console.log(document.querySelector(".sing-in"));

          (<HTMLElement>document.querySelector(".sing-in")).remove();
        }
      }
    );
  }
}

export const USER = new User();
