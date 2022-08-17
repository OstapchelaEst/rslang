export const burgerMenu = () => {
  (<HTMLButtonElement>document.querySelector(".menu__icon ")).addEventListener(
    "click",
    () => {
      document.documentElement.classList.toggle("_lock");
      document.documentElement.classList.toggle("menu-open");
    }
  );
};
