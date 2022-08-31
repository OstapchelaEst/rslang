import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";
import Sprint from "../pages/games/sprint/sprint";
import GameResult from "../pages/games/gameResult/gameResult";

const router = new Navigo("/", { hash: true });

router.on("/", async () => {
  (<HTMLElement>document.querySelector(".main__container")).innerHTML = ``;
  COMPONENT_HEADER.createHeader();
  RENDER_BASIC_STRUCTURE.buildMainPage();
  COMPONENT_FOOTER.createFooter();
});

router.on("/sprint", async () => {
  const contentURL = "https://rs-learnwords-example.herokuapp.com";
  const gameResult: GameResult = new GameResult(contentURL);
  const sprint: Sprint = new Sprint(contentURL, gameResult);

  // sprint.createStartGameComponent();
  sprint.createComponent();
  gameResult.createComponent();

  COMPONENT_HEADER.createHeader();

  sprint.sprintListenerStart();
});

router.resolve();
