import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";
import { ALL_GAME_PAGE } from "../pages/all-games/all-games";
import { AUDIO_CALL_RENDER } from "../pages/audio-call-game/audio-game-render";
import { AUDIO_CALL_GAME } from "../controller/audio-call-game/audio-call-game";

const router = new Navigo("/", { hash: true });

router.on("/", async () => {
  (<HTMLElement>document.querySelector(".main__container")).innerHTML = ``;
  COMPONENT_HEADER.createHeader();
  RENDER_BASIC_STRUCTURE.buildMainPage();
  COMPONENT_FOOTER.createFooter();
});

router.on("/all-games", async () => {
  COMPONENT_HEADER.createHeader();
  COMPONENT_FOOTER.createFooter();
  ALL_GAME_PAGE.renderPage();
});

router.on("/all-games/audio-call", async () => {
  COMPONENT_HEADER.createHeader();
  AUDIO_CALL_RENDER.renderRules();
  AUDIO_CALL_GAME.AudioCallListenerStart();
});

router.resolve();
