import "./global.scss";
import "./pages/main/styles/main-page.scss";
import "./components/header/styles/header.scss";
import "./components/footer/styles/footer.scss";
import "./pages/audio-call-game/style/audio-game.scss";
import "./pages/all-games/styles/all-games.scss";
import "./pages/games/sprint/sprint.scss";
import "./pages/games/gameResult/gameResult.scss";
import "./app/app.ts";
import { AUTHENTICATED } from "./controller/autentificated/autentificatedUser";

AUTHENTICATED.refreshUserToken();
setInterval(() => {
  console.log("REFRESH");
  AUTHENTICATED.refreshUserToken();
}, 100000);
