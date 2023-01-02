import { WordContent } from "../../interfaces/interfaceServerAPI";

export default class AudioPlayer {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  play(word: WordContent) {
    const url = "https://rs-lang-back.onrender.com/";

    this.audio.src = url + word.audio;
    this.audio.play();

    let i = 0;

    this.audio.onended = () => {
      i++;

      if (i === 1) {
        this.audio.src = url + word.audioMeaning;
      } else if (i === 2) {
        this.audio.src = url + word.audioExample;
      } else {
        return;
      }

      this.audio.play();
    };
  }
}
