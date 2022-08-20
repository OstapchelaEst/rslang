import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { burgerMenu } from "../controller/main/header";
import { USER } from "../controller/main/sing-in";

const router = new Navigo("/");

router.on("", async () => {
  await RENDER_BASIC_STRUCTURE.buildMainPage();
  await burgerMenu();
  await USER.singInModalWindow();
});

router.resolve();
