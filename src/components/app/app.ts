import Navigo from "navigo";

const router = new Navigo("/");
router.on("", function () {
  console.log("main-page");
});
