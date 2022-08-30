import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";
import { ALL_GAME_PAGE } from "../pages/all-games/all-games";
import { AUDIO_CALL_RENDER } from "../pages/audio-call-game/audio-game-render";
import { AUDIO_CALL_GAME } from "../controller/audio-call-game/audio-call-game";
import Vocabulary from "../pages/vocabulary/Vocabulary";
import Sprint from "../pages/games/sprint/sprint";
import GameResult from "../pages/games/gameResult/gameResult";

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

router.on("/all-games/sprint", async () => {
  const contentURL = "https://rs-learnwords-example.herokuapp.com";
  const gameResult: GameResult = new GameResult(contentURL);
  const sprint: Sprint = new Sprint(contentURL, gameResult);

  await sprint.createComponent();
  await gameResult.createComponent();

  COMPONENT_HEADER.createHeader();

  sprint.startGame(1);
});

router.on("/vocabulary", async () => {
  const container: HTMLElement | null =
    document.querySelector(".main__container");

  if (!container) return;

  const vocabulary: Vocabulary = new Vocabulary();
  await vocabulary.render();

  COMPONENT_HEADER.createHeader();

  container.innerHTML = "";
  container.append(vocabulary.el);

  COMPONENT_FOOTER.createFooter();
});

router.resolve();
