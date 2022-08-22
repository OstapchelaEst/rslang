import Navigo from "navigo";
import { RENDER_BASIC_STRUCTURE } from "../pages/main/main-page-render";
import { COMPONENT_HEADER } from "../components/header/header";
import { COMPONENT_FOOTER } from "../components/footer/footer";

const router = new Navigo("/");

router.on("", async () => {
  COMPONENT_HEADER.createHeader();
  RENDER_BASIC_STRUCTURE.buildMainPage();
  COMPONENT_FOOTER.createFooter();
});

router.resolve();
