import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";
import Vocabulary from "../pages/vocabulary/Vocabulary";

const router = new Navigo("/", { hash: true });

router.on("", () => {
  COMPONENT_HEADER.createHeader();
  RENDER_BASIC_STRUCTURE.buildMainPage();
  COMPONENT_FOOTER.createFooter();
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
