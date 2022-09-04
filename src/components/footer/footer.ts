import { TEAM_TEXT } from "../../pages/main/block-text";
import { SVG } from "../../pages/main/svg-pictures";

class ComponentFooter {
  createFooter() {
    if (document.querySelector(".footer")) return;
    const FOOTER = document.createElement("footer");
    FOOTER.classList.add("footer");
    FOOTER.innerHTML = `
   <div class="footer__container">
   <ul class="footer__list">
      <li class="footer__item ">
         ${SVG.gitIcon}
         <a href="${TEAM_TEXT.dima.gitLink}" target="_blank">Дима</a>
         <a href="${TEAM_TEXT.lena.gitLink}" target="_blank">Лена</a>
         <a href="${TEAM_TEXT.kirill.gitLink}" target="_blank">Кирилл</a>
         <a href="${TEAM_TEXT.artem.gitLink}" target="_blank">Артём</a>
      </li>
      <li class="footer__item">
         <span>© 2022</span>
      </li>
      <li class="footer__item">
         <a href="https://rs.school/js/" target="_blank">
            <img class="footer__logo" src="https://rs.school/images/rs_school_js.svg" alt="Logo RS school">
         </a>
      </li>
   </ul>
</div>`;
    (<HTMLElement>document.querySelector(".wrapper")).append(FOOTER);
  }
  removeFooter() {
    const FOOTER = document.querySelector(".footer");
    if (FOOTER) FOOTER.remove();
  }
}

export const COMPONENT_FOOTER = new ComponentFooter();
