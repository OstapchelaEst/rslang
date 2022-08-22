import { REGISTRATION } from "./registration";

class Validation {
  inputListener(input: string, action: VoidFunction) {
    (<HTMLInputElement>(
      document.querySelector(`.registration__input-${input}`)
    )).addEventListener("input", () => {
      action();
      this.disableButton();
    });
  }
  validationListeners() {
    this.inputListener("email", this.validationEmail);
    this.inputListener("name", this.validationName);
    this.inputListener("password-1", this.validationPassword);
    this.inputListener("password-2", this.validationPassword);

    (<HTMLButtonElement>(
      document.querySelector(".registration__input-button")
    )).addEventListener("click", (e) => {
      REGISTRATION.registrationnButton(e);
    });
  }

  validationEmail() {
    const USER_WRITE = <HTMLFormElement>(
      document.querySelector(".registration__input-email")
    );
    const LABEL = document.querySelector('[for="email"]') as HTMLFormElement;
    const PATTERN = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    return VALIDATION.validation(USER_WRITE.value, LABEL, PATTERN);
  }

  validationName() {
    const USER_WRITE = <HTMLFormElement>(
      document.querySelector(".registration__input-name")
    );
    const LABEL = document.querySelector('[for="name"]') as HTMLFormElement;
    const PATTERN = /[a-z]{2,}$/;
    return VALIDATION.validation(USER_WRITE.value, LABEL, PATTERN);
  }

  validationPassword() {
    const USER_WRITE_1 = (<HTMLFormElement>(
      document.querySelector(".registration__input-password-1")
    )).value;
    const USER_WRITE_2 = (<HTMLFormElement>(
      document.querySelector(".registration__input-password-2")
    )).value;
    const LABEL_1 = document.querySelector(
      '[for="password-1"]'
    ) as HTMLFormElement;
    const LABEL_2 = document.querySelector(
      '[for="password-2"]'
    ) as HTMLFormElement;
    if (USER_WRITE_1.length >= 8 && USER_WRITE_1 === USER_WRITE_2) {
      if (LABEL_1.classList.contains("false")) {
        LABEL_1.classList.remove("false");
        LABEL_2.classList.remove("false");
      }
      if (!LABEL_1.classList.contains("true")) {
        LABEL_1.classList.add("true");
        LABEL_2.classList.add("true");
      }
      return USER_WRITE_1;
    } else {
      if (LABEL_1.classList.contains("true")) {
        LABEL_1.classList.remove("true");
        LABEL_2.classList.remove("true");
      }
      if (!LABEL_1.classList.contains("false")) {
        LABEL_1.classList.add("false");
        LABEL_2.classList.add("false");
      }
      return false;
    }
  }

  validation(value: string, item: HTMLElement, pattern: RegExp) {
    if (value.match(pattern)) {
      if (item.classList.contains("false")) {
        item.classList.remove("false");
      }
      if (!item.classList.contains("true")) {
        item.classList.add("true");
      }
      return value;
    } else {
      if (item.classList.contains("true")) {
        item.classList.remove("true");
      }
      if (!item.classList.contains("false")) {
        item.classList.add("false");
      }
      return false;
    }
  }
  disableButton() {
    const BUTTON = document.querySelector(
      ".registration__input-button"
    ) as HTMLButtonElement;
    if (
      this.validationEmail() &&
      this.validationName() &&
      this.validationPassword()
    ) {
      if (BUTTON.classList.contains("disable")) {
        BUTTON.classList.remove("disable");
      }
    } else {
      if (!BUTTON.classList.contains("disable")) {
        BUTTON.classList.add("disable");
      }
    }
  }
}

export const VALIDATION = new Validation();
