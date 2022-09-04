class KeyBoardSprint {
  hotKey() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      const hotKeysSprint = ["ArrowLeft", "ArrowRight"];

      if (!hotKeysSprint.includes(event.code)) {
        return;
      }

      const sprintElem = document.querySelector(".sprint") as HTMLElement;
      const gameResultElem = document.querySelector(
        ".gameResult"
      ) as HTMLElement;
      if (sprintElem && hotKeysSprint.includes(event.code)) {
        const noBtn = sprintElem.querySelector(
          ".sprint__no"
        ) as HTMLButtonElement;
        const yesBtn = sprintElem.querySelector(
          ".sprint__yes"
        ) as HTMLButtonElement;

        if (event.code === "ArrowLeft" && !gameResultElem) {
          noBtn.dispatchEvent(new Event("click"));
        } else if (event.code === "ArrowRight" && !gameResultElem) {
          yesBtn.dispatchEvent(new Event("click"));
        }
      }
    });
  }
}

export const keyBoardSprint = new KeyBoardSprint();
