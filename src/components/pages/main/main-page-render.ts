class RenderBasicStructure {
  header() {
    if (document.querySelector(".header")) return;
    const HEADER = document.createElement("header");
    HEADER.classList.add("header");
    HEADER.innerHTML = `
      <div class="header__container">
      <div class="header__menu menu"> 
         <a href="http://localhost:8080/" class="header__logo" data-navigo><span>RS-lang</span>  <svg class="header__logo-svg" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 491.52 491.52" style="enable-background:new 0 0 491.52 491.52;" xml:space="preserve">
        <g>
           <g>
              <g>
                 <path d="M434.269,403.635c0.083-0.083,0.158-0.173,0.24-0.257c0.373-0.384,0.73-0.774,1.065-1.172
                    c0.056-0.067,0.108-0.137,0.162-0.205c3.43-4.178,4.832-9.099,4.567-13.864V20.48c0-11.311-9.169-20.48-20.48-20.48H102.732
                    C74.259,0,51.184,23.075,51.184,51.548v378.37c0,0.054-0.004,0.108-0.004,0.162c0,33.941,27.499,61.44,61.44,61.44h307.2
                    c18.246,0,27.383-22.06,14.482-34.962C415.01,437.268,415,422.92,434.269,403.635z M399.344,368.64h-40.964V40.96h40.964V368.64z
                     M92.144,51.548c0-5.852,4.737-10.588,10.588-10.588h214.688v327.68H112.624h-0.004c-0.008,0-0.015,0.001-0.023,0.001
                    c-0.978,0-1.949,0.028-2.916,0.074c-0.326,0.015-0.648,0.042-0.973,0.063c-0.65,0.041-1.298,0.087-1.942,0.148
                    c-0.374,0.035-0.746,0.078-1.119,0.12c-0.594,0.067-1.185,0.141-1.773,0.225c-0.381,0.054-0.761,0.111-1.14,0.172
                    c-0.587,0.095-1.171,0.201-1.752,0.313c-0.36,0.069-0.721,0.135-1.079,0.21c-0.655,0.138-1.303,0.292-1.95,0.45
                    c-0.272,0.067-0.547,0.125-0.817,0.195c-0.895,0.232-1.783,0.484-2.662,0.756c-0.282,0.087-0.558,0.186-0.838,0.276
                    c-0.499,0.162-1,0.318-1.493,0.492V51.548z M382.34,450.56h-269.72c-11.32,0-20.48-9.16-20.48-20.48h0.004
                    c0-11.32,9.16-20.48,20.48-20.48H382.34C377.706,423.174,377.706,436.986,382.34,450.56z"/>
                 <path d="M194.539,245.76h81.92c11.311,0,20.48-9.169,20.48-20.48s-9.169-20.48-20.48-20.48h-81.92
                    c-11.311,0-20.48,9.169-20.48,20.48S183.229,245.76,194.539,245.76z"/>
                 <path d="M153.579,327.68h122.88c11.311,0,20.48-9.169,20.48-20.48s-9.169-20.48-20.48-20.48h-122.88
                    c-11.311,0-20.48,9.169-20.48,20.48S142.269,327.68,153.579,327.68z"/>
              </g>
           </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        </svg></a>
         <button type="button" class="menu__icon icon-menu"><span></span></button>
         <nav class="menu__body">
            <ul class="menu__list">
               <li class="menu__item"><a href="/about/contacts" class="menu__link" data-navigo>Наша команда</a></li>
               <li class="menu__item"><a href="" class="menu__link">Учебник</a></li>
               <li class="menu__item"><a href="" class="menu__link">Игры</a></li>
               <li class="menu__item"><a href="" class="menu__link">Статистика</a></li>
               <li class="menu__item"><a href="" class="menu__link-registration">Войти</a></li>
            </ul>
         </nav>
      </div>
   </div>
      `;
    (<HTMLElement>document.querySelector(".wrapper")).prepend(HEADER);
  }

  footer() {
    if (document.querySelector(".footer")) return;
    const FOOTER = document.createElement("footer");
    FOOTER.classList.add("footer");
    FOOTER.innerHTML = `
   <div class="footer__container">
   <ul class="footer__list">
      <li class="footer__item ">
         <svg height="32" fill="#fff" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
            data-view-component="true" class="octicon octicon-mark-github v-align-middle">
            <path fill-rule="evenodd"
               d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
            </path>
         </svg>
         <a href="https://github.com/OstapchelaEst" target="_blank">Дима</a>
         <a href="https://github.com/LenaStask" target="_blank">Лена</a>
         <a href="https://github.com/teame92" target="_blank">Кирилл</a>
         <a href="https://github.com/RockStar666by" target="_blank">Артём</a>
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
}
export const RENDER_BASIC_STRUCTURE = new RenderBasicStructure();
