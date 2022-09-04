import { AUDIO_CALL_GAME } from "./audio-call-game";
import { SONG_AUDIO_CALL } from "./song-audio-call";

class KeyBoard {
  addKeyBoardChoiseListener() {
    document.addEventListener("keydown", KEY_BOARD.KeyBoardChoise);
  }

  removeKeyBoardChoiseListener() {
    document.removeEventListener("keydown", KEY_BOARD.KeyBoardChoise);
  }

  KeyBoardChoise(e: KeyboardEvent) {
    if (
      !(<HTMLButtonElement>(
        document.querySelector(".audio-call-game__select")
      )).classList.contains("active")
    ) {
      switch (e.code) {
        case "Digit1":
          AUDIO_CALL_GAME.userChoise(
            document.querySelector(
              ".audio-call-game__button-choice-1"
            ) as HTMLButtonElement
          );
          break;
        case "Digit2":
          AUDIO_CALL_GAME.userChoise(
            document.querySelector(
              ".audio-call-game__button-choice-2"
            ) as HTMLButtonElement
          );
          break;
        case "Digit3":
          AUDIO_CALL_GAME.userChoise(
            document.querySelector(
              ".audio-call-game__button-choice-3"
            ) as HTMLButtonElement
          );
          break;
        case "Digit4":
          AUDIO_CALL_GAME.userChoise(
            document.querySelector(
              ".audio-call-game__button-choice-4"
            ) as HTMLButtonElement
          );
          break;
        case "Digit5":
          AUDIO_CALL_GAME.userChoise(
            document.querySelector(
              ".audio-call-game__button-choice-5"
            ) as HTMLButtonElement
          );
          break;
        default:
          break;
      }
    }

    switch (e.code) {
      case "Space":
        SONG_AUDIO_CALL.playWord();
        break;
      case "Enter":
        if (
          (<HTMLButtonElement>(
            document.querySelector(".audio-call-game__select")
          )).classList.contains("active")
        ) {
          AUDIO_CALL_GAME.finishGame();
        }
        break;
      default:
        break;
    }
  }
}

export const KEY_BOARD = new KeyBoard();
