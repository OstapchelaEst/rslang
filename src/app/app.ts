import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";
import { AUDIO_CALL_RENDER } from "../pages/audio-call-game/audio-game-render";
import { AUDIO_CALL_GAME } from "../controller/audio-call-game/audio-call-game";

const router = new Navigo("/", { hash: true });

router.on("/", async () => {
  (<HTMLElement>document.querySelector(".main__container")).innerHTML = ``;
  COMPONENT_HEADER.createHeader();
  RENDER_BASIC_STRUCTURE.buildMainPage();
  COMPONENT_FOOTER.createFooter();
});

router.on("/audio-call-game", async () => {
  COMPONENT_HEADER.createHeader();
  COMPONENT_FOOTER.createFooter();
  AUDIO_CALL_RENDER.renderRules();
  AUDIO_CALL_GAME.AudioCallListenerStart();
});

router.resolve();
