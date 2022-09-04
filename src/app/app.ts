import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";
import { ALL_GAME_PAGE } from "../pages/all-games/all-games";
import { AUDIO_CALL_RENDER } from "../pages/audio-call-game/audio-game-render";
import { AUDIO_CALL_GAME } from "../controller/audio-call-game/audio-call-game";
import Vocabulary from "../pages/vocabulary/Vocabulary";
import { sprint } from "../pages/games/sprint/sprint";
import GameResult from "../pages/games/gameResult/gameResult";
import Statistic from "../pages/statistics/Statistics";

const router = new Navigo("/", { hash: true });

router.on("/", async () => {
  (<HTMLElement>document.querySelector(".main__container")).innerHTML = ``;
  COMPONENT_HEADER.createHeader();
  RENDER_BASIC_STRUCTURE.buildMainPage();
  COMPONENT_FOOTER.createFooter();
});

router.on("/all-games", async () => {
  COMPONENT_HEADER.createHeader();
  ALL_GAME_PAGE.renderPage();
  COMPONENT_FOOTER.createFooter();
});

router.on("/all-games/audio-call", async () => {
  COMPONENT_HEADER.createHeader();
  AUDIO_CALL_RENDER.renderRules();
  AUDIO_CALL_GAME.AudioCallListenerStart();
  COMPONENT_FOOTER.removeFooter();
});

router.on("/all-games/sprint", async () => {
  const contentURL = "https://rs-learnwords-example.herokuapp.com";
  const gameResult: GameResult = new GameResult(contentURL);

  sprint.createComponent();
  gameResult.createComponent();

  COMPONENT_HEADER.createHeader();

  sprint.sprintListenerStart();
  COMPONENT_FOOTER.removeFooter();
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

router.on("/statistics", async () => {
  const container: HTMLElement | null =
    document.querySelector(".main__container");

  if (!container) return;

  const statistics: Statistic = new Statistic();
  await statistics.render();

  COMPONENT_HEADER.createHeader();

  container.innerHTML = "";
  container.append(statistics.el);

  COMPONENT_FOOTER.createFooter();
});

router.resolve();
