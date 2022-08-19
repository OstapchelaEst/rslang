import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { burgerMenu } from "../controller/main/header";

const router = new Navigo("/");

router.on("", async () => {
  await RENDER_BASIC_STRUCTURE.header();
  await RENDER_BASIC_STRUCTURE.footer();
  await RENDER_BASIC_STRUCTURE.startPage();
  await RENDER_BASIC_STRUCTURE.functionalPage();
  await RENDER_BASIC_STRUCTURE.teamPage();
  await burgerMenu();
});

router.resolve();
