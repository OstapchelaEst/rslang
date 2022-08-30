class SongAudioCall {
  addListenerPlayWord() {
    (<HTMLButtonElement>(
      document.querySelector(".audio-call-game__play-button")
    )).addEventListener("click", this.playWord);
  }

  playWord() {
    (<HTMLAudioElement>(
      document.querySelector(".audio-call-game__audio")
    )).play();
  }

  playSongTrue() {
    if (
      (<HTMLElement>document.querySelector(".main")).classList.contains(
        "audio-false"
      )
    ) {
      return;
    }
    (<HTMLAudioElement>(
      document.querySelector(".audio-call-game__audio-true")
    )).play();
  }

  playSongFalse() {
    if (
      (<HTMLElement>document.querySelector(".main")).classList.contains(
        "audio-false"
      )
    ) {
      return;
    }
    (<HTMLAudioElement>(
      document.querySelector(".audio-call-game__audio-false")
    )).play();
  }
}

export const SONG_AUDIO_CALL = new SongAudioCall();
