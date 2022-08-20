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
               <li class="menu__item"><button type="button" class="menu__link-registration">Войти</button></li>
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

  startPage() {
    if (document.querySelector(".start-page")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("start-page");
    PAGE.innerHTML = `
   <div class="start-page">
   <div class="start-page__body">
      <div class="start-page__img-1">
         <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="1.77348" y="15.267" width="88" height="88" rx="19" transform="rotate(-8.82041 1.77348 15.267)" fill="url(#paint0_linear_15006_5)" fill-opacity="0.9" stroke="url(#paint1_linear_15006_5)" stroke-width="2"/>
         <g clip-path="url(#clip0_15006_5)">
         <path d="M29.4058 34.7527C28.6884 35.731 28.8998 37.1056 29.8781 37.8231L31.1828 38.7799C32.1611 39.4973 33.5357 39.2859 34.2531 38.3076C34.9706 37.3294 34.7591 35.9547 33.7809 35.2373L32.4762 34.2805C31.4979 33.563 30.1233 33.7745 29.4058 34.7527ZM48.5581 23.2093C47.3392 23.3968 46.503 24.5369 46.6905 25.7559L47.077 28.2687C47.2645 29.4876 48.4047 30.3238 49.6236 30.1363C50.8426 29.9488 51.6787 28.8087 51.4912 27.5897L51.1047 25.0769C50.9172 23.8579 49.7771 23.0218 48.5581 23.2093ZM29.211 57.9698C30.4299 57.7824 31.2661 56.6422 31.0786 55.4233C30.8911 54.2043 29.751 53.3682 28.532 53.5557L25.8936 53.9615C24.6746 54.149 23.8385 55.2891 24.0259 56.5081C24.2134 57.727 25.3536 58.5632 26.5725 58.3757L29.211 57.9698ZM63.001 66.464C62.8109 65.2277 63.3109 64.0293 64.1592 63.1859C65.6908 61.663 66.8792 59.8761 67.7248 57.8208C68.7812 55.2534 69.0925 52.5526 68.6549 49.7078C67.9923 45.3997 65.9103 41.9687 62.393 39.3892C58.8757 36.8096 54.9776 35.8549 50.6694 36.5176C46.3613 37.1802 42.9303 39.2623 40.3508 42.7796C37.7713 46.2969 36.8165 50.1949 37.4792 54.5031C37.9172 57.3506 39.0065 59.8379 40.7456 61.9761C42.1349 63.6842 43.8103 65.0292 45.7753 66.0142C46.8601 66.558 47.7188 67.5599 47.9118 68.8146L48.8764 75.0859C49.2542 77.5423 51.5518 79.2273 54.0082 78.8495L60.2065 77.8961C62.6629 77.5183 64.3479 75.2207 63.9701 72.7643L63.001 66.464ZM74.9106 48.6813C75.0981 49.9002 76.2382 50.7364 77.4572 50.5489L80.0956 50.1431C81.3146 49.9556 82.1507 48.8155 81.9632 47.5965C81.7757 46.3776 80.6356 45.5414 79.4167 45.7289L76.7782 46.1347C75.5593 46.3222 74.7231 47.4624 74.9106 48.6813ZM66.2774 30.2263C65.5606 31.2037 65.784 32.5788 66.7734 33.279C67.7305 33.9562 69.0524 33.7502 69.758 32.8139L70.7317 31.5218C71.4626 30.5518 71.2594 29.1714 70.28 28.4532C69.3096 27.7415 67.9459 27.9512 67.2342 28.9217L66.2774 30.2263Z" fill="#9DA2C8" stroke="#6668AA"/>
         </g>
         <defs>
         <linearGradient id="paint0_linear_15006_5" x1="45.4992" y1="-14.4358" x2="45.4993" y2="129.055" gradientUnits="userSpaceOnUse">
         <stop stop-color="#4C5E9D"/>
         <stop offset="1" stop-color="#171836"/>
         </linearGradient>
         <linearGradient id="paint1_linear_15006_5" x1="45.632" y1="14.4321" x2="45.632" y2="104.432" gradientUnits="userSpaceOnUse">
         <stop stop-color="#3F458D" stop-opacity="0.63"/>
         <stop offset="1" stop-color="#3F458D" stop-opacity="0.14"/>
         </linearGradient>
         <clipPath id="clip0_15006_5">
         <rect width="60" height="56.9492" fill="white" transform="matrix(0.988376 -0.152026 -0.152026 -0.988376 27.6577 83.4084)"/>
         </clipPath>
         </defs>
         </svg>
      </div>
      <div class="start-page__img-2">
         <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="20.8332" y="1.35063" width="88" height="88" rx="19" transform="rotate(12.7909 20.8332 1.35063)" fill="url(#paint0_linear_15006_6)" fill-opacity="0.9" stroke="url(#paint1_linear_15006_6)" stroke-width="2"/>
         <g clip-path="url(#clip0_15006_6)">
         <mask id="path-2-inside-1_15006_6" fill="white">
         <path d="M71.1097 39.5815L47.486 28.7634C47.486 28.7634 44.0466 25.7055 40.9039 29.4471C39.6069 30.9912 39.3252 32.7172 39.3252 32.7172L33.4105 69.4277C32.9382 72.8264 37.0756 73.9251 37.0756 73.9251L68.6491 81.8292L68.5251 80.2742C69.1857 79.0869 70.6597 77.0988 73.2296 76.8553C73.287 76.8497 73.329 76.8114 73.3786 76.7858L74.3376 77.1003L71.1097 39.5815ZM48.9858 45.3701L50.0967 37.0276L67.7904 44.7417L68.1262 52.3049L48.9858 45.3701ZM69.5243 77.6009C69.2002 77.8919 68.9064 78.1936 68.6582 78.4993L48.0859 73.1264L68.1082 79.2605C68.0267 79.3867 67.9432 79.5124 67.8743 79.6308L41.3702 72.9008L67.4525 80.4348L67.4266 80.4889L37.9487 72.8857C37.9332 72.8837 36.5447 72.5879 35.5827 71.7799C34.6323 70.9816 34.45 69.996 35.0231 68.7657C36.4948 65.604 41.6664 67.4552 41.744 67.4837L71.4811 76.3673C71.0834 76.523 70.7296 76.7241 70.3943 76.9396L51.0744 71.8277L69.5243 77.6009Z"/>
         </mask>
         <path d="M71.1097 39.5815L47.486 28.7634C47.486 28.7634 44.0466 25.7055 40.9039 29.4471C39.6069 30.9912 39.3252 32.7172 39.3252 32.7172L33.4105 69.4277C32.9382 72.8264 37.0756 73.9251 37.0756 73.9251L68.6491 81.8292L68.5251 80.2742C69.1857 79.0869 70.6597 77.0988 73.2296 76.8553C73.287 76.8497 73.329 76.8114 73.3786 76.7858L74.3376 77.1003L71.1097 39.5815ZM48.9858 45.3701L50.0967 37.0276L67.7904 44.7417L68.1262 52.3049L48.9858 45.3701ZM69.5243 77.6009C69.2002 77.8919 68.9064 78.1936 68.6582 78.4993L48.0859 73.1264L68.1082 79.2605C68.0267 79.3867 67.9432 79.5124 67.8743 79.6308L41.3702 72.9008L67.4525 80.4348L67.4266 80.4889L37.9487 72.8857C37.9332 72.8837 36.5447 72.5879 35.5827 71.7799C34.6323 70.9816 34.45 69.996 35.0231 68.7657C36.4948 65.604 41.6664 67.4552 41.744 67.4837L71.4811 76.3673C71.0834 76.523 70.7296 76.7241 70.3943 76.9396L51.0744 71.8277L69.5243 77.6009Z" fill="#9DA2C8"/>
         <path d="M71.1097 39.5815L72.1061 39.4957L72.0561 38.915L71.5261 38.6723L71.1097 39.5815ZM47.486 28.7634L46.8215 29.5107L46.9335 29.6102L47.0696 29.6726L47.486 28.7634ZM39.3252 32.7172L38.3383 32.5561L38.338 32.5581L39.3252 32.7172ZM33.4105 69.4277L32.4232 69.2686L32.4215 69.2793L32.42 69.2901L33.4105 69.4277ZM37.0756 73.9251L36.8189 74.8916L36.8258 74.8935L36.8327 74.8952L37.0756 73.9251ZM68.6491 81.8292L68.4062 82.7992L69.7565 83.1373L69.6459 81.7497L68.6491 81.8292ZM68.5251 80.2742L67.6513 79.7881L67.5043 80.0523L67.5283 80.3537L68.5251 80.2742ZM73.2296 76.8553L73.324 77.8509L73.3278 77.8505L73.2296 76.8553ZM73.3786 76.7858L73.6903 75.8356L73.2925 75.7051L72.9203 75.897L73.3786 76.7858ZM74.3376 77.1003L74.026 78.0505L75.4636 78.522L75.3339 77.0146L74.3376 77.1003ZM50.0967 37.0276L50.4963 36.111L49.2805 35.5809L49.1054 36.8956L50.0967 37.0276ZM67.7904 44.7417L68.7894 44.6974L68.7617 44.0743L68.19 43.8251L67.7904 44.7417ZM68.1262 52.3049L67.7856 53.2451L69.1916 53.7545L69.1253 52.2605L68.1262 52.3049ZM68.6582 78.4993L68.4055 79.4669L69.0286 79.6296L69.4345 79.1296L68.6582 78.4993ZM48.0859 73.1264L48.3386 72.1588L47.793 74.0825L48.0859 73.1264ZM68.1082 79.2605L68.9482 79.8031L69.666 78.6918L68.4012 78.3043L68.1082 79.2605ZM67.8743 79.6308L67.6282 80.6001L68.3594 80.7858L68.7387 80.1336L67.8743 79.6308ZM41.3702 72.9008L41.6163 71.9315L41.0927 73.8615L41.3702 72.9008ZM67.4525 80.4348L68.3546 80.8662L68.8638 79.8015L67.73 79.474L67.4525 80.4348ZM67.4266 80.4889L67.1768 81.4572L67.9737 81.6628L68.3287 80.9204L67.4266 80.4889ZM37.9487 72.8857L38.1984 71.9173L38.1377 71.9017L38.0756 71.8937L37.9487 72.8857ZM35.0231 68.7657L35.9296 69.1879L35.9297 69.1877L35.0231 68.7657ZM41.744 67.4837L41.3995 68.4224L41.4283 68.433L41.4578 68.4418L41.744 67.4837ZM71.4811 76.3673L71.8456 77.2985L74.5489 76.2401L71.7673 75.4091L71.4811 76.3673ZM70.3943 76.9396L70.1385 77.9063L70.5644 78.019L70.935 77.7808L70.3943 76.9396ZM51.0744 71.8277L51.3302 70.8609L50.7758 72.782L51.0744 71.8277ZM71.5261 38.6723L47.9023 27.8542L47.0696 29.6726L70.6934 40.4907L71.5261 38.6723ZM47.486 28.7634C48.1504 28.016 48.15 28.0157 48.1496 28.0153C48.1494 28.0152 48.149 28.0148 48.1487 28.0145C48.1481 28.0139 48.1474 28.0133 48.1466 28.0127C48.1452 28.0114 48.1435 28.0099 48.1416 28.0082C48.1378 28.0049 48.1331 28.0008 48.1275 27.9961C48.1165 27.9866 48.102 27.9743 48.0841 27.9595C48.0485 27.9301 47.9995 27.8906 47.938 27.8437C47.8152 27.7502 47.641 27.6259 47.4228 27.4919C46.9906 27.2265 46.3631 26.9089 45.604 26.7291C44.8387 26.5478 43.9274 26.5042 42.9592 26.8075C41.9877 27.1119 41.0285 27.7439 40.1382 28.8039L41.6697 30.0902C42.3507 29.2794 43 28.8906 43.5572 28.716C44.1178 28.5404 44.6556 28.5597 45.1429 28.6752C45.6365 28.7921 46.0652 29.0052 46.3761 29.1961C46.5295 29.2903 46.6485 29.3757 46.7261 29.4348C46.7648 29.4642 46.7927 29.4868 46.809 29.5003C46.8171 29.5071 46.8223 29.5115 46.8245 29.5133C46.8255 29.5142 46.8258 29.5145 46.8253 29.5141C46.8251 29.5139 46.8247 29.5135 46.824 29.5129C46.8237 29.5126 46.8233 29.5123 46.8229 29.5119C46.8227 29.5118 46.8224 29.5114 46.8223 29.5114C46.8219 29.511 46.8215 29.5107 47.486 28.7634ZM40.1382 28.8039C39.3968 29.6866 38.9514 30.613 38.6911 31.3122C38.5602 31.6637 38.4739 31.9634 38.4196 32.1799C38.3924 32.2883 38.373 32.3764 38.36 32.4402C38.3535 32.4722 38.3486 32.4981 38.345 32.5176C38.3432 32.5273 38.3418 32.5354 38.3407 32.5418C38.3401 32.5451 38.3397 32.5479 38.3393 32.5502C38.3391 32.5514 38.3389 32.5525 38.3387 32.5535C38.3386 32.554 38.3386 32.5544 38.3385 32.5549C38.3385 32.5551 38.3384 32.5554 38.3384 32.5555C38.3383 32.5558 38.3383 32.5561 39.3252 32.7172C40.3122 32.8783 40.3121 32.8785 40.3121 32.8788C40.3121 32.8789 40.312 32.8792 40.312 32.8793C40.3119 32.8796 40.3119 32.8799 40.3118 32.8802C40.3118 32.8808 40.3117 32.8812 40.3116 32.8816C40.3115 32.8823 40.3114 32.8826 40.3115 32.8825C40.3115 32.8823 40.3118 32.8805 40.3124 32.8772C40.3136 32.8707 40.316 32.858 40.3197 32.8397C40.3272 32.8032 40.34 32.7444 40.3594 32.6668C40.3984 32.5114 40.4637 32.2832 40.5653 32.0101C40.7701 31.4603 41.1141 30.7517 41.6697 30.0902L40.1382 28.8039ZM38.338 32.5581L32.4232 69.2686L34.3977 69.5867L40.3125 32.8762L38.338 32.5581ZM32.42 69.2901C32.1131 71.4987 33.343 72.9458 34.4831 73.7635C35.0523 74.1718 35.629 74.45 36.0569 74.6255C36.2728 74.7141 36.4558 74.7786 36.588 74.8218C36.6542 74.8434 36.7079 74.8598 36.7471 74.8713C36.7667 74.8771 36.7826 74.8816 36.7947 74.885C36.8007 74.8867 36.8058 74.8881 36.8098 74.8892C36.8118 74.8897 36.8136 74.8902 36.8151 74.8906C36.8159 74.8908 36.8166 74.891 36.8172 74.8912C36.8175 74.8913 36.8179 74.8914 36.8181 74.8914C36.8185 74.8915 36.8189 74.8916 37.0756 73.9251C37.3322 72.9586 37.3326 72.9587 37.3329 72.9588C37.333 72.9588 37.3333 72.9589 37.3335 72.959C37.3339 72.9591 37.3342 72.9592 37.3345 72.9592C37.335 72.9594 37.3353 72.9594 37.3353 72.9595C37.3354 72.9595 37.3345 72.9592 37.3327 72.9587C37.3291 72.9577 37.3219 72.9557 37.3113 72.9526C37.2901 72.9463 37.2554 72.9358 37.2094 72.9208C37.1171 72.8906 36.9806 72.8427 36.816 72.7752C36.483 72.6385 36.0549 72.4296 35.6487 72.1383C34.8382 71.557 34.2356 70.7554 34.401 69.5653L32.42 69.2901ZM36.8327 74.8952L68.4062 82.7992L68.8919 80.8591L37.3184 72.9551L36.8327 74.8952ZM69.6459 81.7497L69.522 80.1948L67.5283 80.3537L67.6522 81.9086L69.6459 81.7497ZM69.399 80.7604C70.0154 79.6525 71.2634 78.0461 73.324 77.8509L73.1353 75.8598C70.056 76.1516 68.356 78.5213 67.6513 79.7881L69.399 80.7604ZM73.3278 77.8505C73.5566 77.8279 73.7229 77.7416 73.7986 77.6989C73.8181 77.6879 73.8345 77.678 73.8453 77.6714C73.8508 77.6681 73.8557 77.665 73.8592 77.6629C73.8635 77.6602 73.8647 77.6595 73.8669 77.6581C73.8762 77.6524 73.8607 77.6624 73.8369 77.6746L72.9203 75.897C72.8718 75.922 72.8324 75.9464 72.818 75.9552C72.7944 75.9698 72.8059 75.9626 72.8155 75.9572C72.8434 75.9414 72.9601 75.877 73.1315 75.8601L73.3278 77.8505ZM73.067 77.736L74.026 78.0505L74.6492 76.1501L73.6903 75.8356L73.067 77.736ZM75.3339 77.0146L72.1061 39.4957L70.1134 39.6672L73.3413 77.186L75.3339 77.0146ZM49.9771 45.5021L51.0879 37.1596L49.1054 36.8956L47.9946 45.2381L49.9771 45.5021ZM49.697 37.9443L67.3907 45.6584L68.19 43.8251L50.4963 36.111L49.697 37.9443ZM66.7914 44.7861L67.1272 52.3493L69.1253 52.2605L68.7894 44.6974L66.7914 44.7861ZM68.4669 51.3647L49.3265 44.4299L48.6452 46.3103L67.7856 53.2451L68.4669 51.3647ZM68.856 76.8569C68.5013 77.1755 68.1694 77.5149 67.8818 77.869L69.4345 79.1296C69.6434 78.8723 69.8992 78.6082 70.1925 78.3448L68.856 76.8569ZM68.9109 77.5318L48.3386 72.1588L47.8332 74.0939L68.4055 79.4669L68.9109 77.5318ZM47.793 74.0825L67.8153 80.2166L68.4012 78.3043L48.3788 72.1702L47.793 74.0825ZM67.2682 78.7179C67.1979 78.8268 67.0941 78.9832 67.0098 79.1281L68.7387 80.1336C68.7922 80.0416 68.8556 79.9465 68.9482 79.8031L67.2682 78.7179ZM68.1204 78.6616L41.6163 71.9315L41.1241 73.87L67.6282 80.6001L68.1204 78.6616ZM41.0927 73.8615L67.175 81.3955L67.73 79.474L41.6477 71.94L41.0927 73.8615ZM66.5503 80.0033L66.5244 80.0575L68.3287 80.9204L68.3546 80.8662L66.5503 80.0033ZM67.6763 79.5206L38.1984 71.9173L37.6989 73.854L67.1768 81.4572L67.6763 79.5206ZM38.0756 71.8937C38.1404 71.902 38.1821 71.9142 38.114 71.898C38.0834 71.8907 38.0354 71.8787 37.9735 71.8616C37.8492 71.8274 37.6727 71.7737 37.4703 71.6982C37.053 71.5424 36.5838 71.3148 36.2259 71.0142L34.9396 72.5457C35.5436 73.053 36.2496 73.3773 36.7709 73.5719C37.0379 73.6715 37.2715 73.7427 37.4419 73.7897C37.5274 73.8133 37.598 73.831 37.65 73.8434C37.6645 73.8469 37.753 73.8688 37.8217 73.8776L38.0756 71.8937ZM36.2259 71.0142C35.8863 70.729 35.7563 70.4759 35.7148 70.2524C35.6712 70.0171 35.7011 69.6785 35.9296 69.1879L34.1166 68.3435C33.7721 69.0832 33.6066 69.8526 33.7484 70.6172C33.8924 71.3937 34.3287 72.0325 34.9396 72.5457L36.2259 71.0142ZM35.9297 69.1877C36.3933 68.1917 37.4691 67.8608 38.8585 67.9272C39.5166 67.9587 40.1488 68.0797 40.6283 68.1982C41.106 68.3162 41.4086 68.4258 41.3995 68.4224L42.0886 66.5449C42.0156 66.5181 40.5913 66.0079 38.9541 65.9295C37.3704 65.8537 35.1246 66.178 34.1165 68.3437L35.9297 69.1877ZM41.4578 68.4418L71.1948 77.3255L71.7673 75.4091L42.0303 66.5255L41.4578 68.4418ZM71.1165 75.4361C70.6343 75.6249 70.219 75.8636 69.8536 76.0984L70.935 77.7808C71.2402 77.5847 71.5324 77.4211 71.8456 77.2985L71.1165 75.4361ZM70.6501 75.9729L51.3302 70.8609L50.8186 72.7944L70.1385 77.9063L70.6501 75.9729ZM50.7758 72.782L69.2256 78.5552L69.8229 76.6465L51.3731 70.8733L50.7758 72.782Z" fill="#6668AA" mask="url(#path-2-inside-1_15006_6)"/>
         </g>
         <defs>
         <linearGradient id="paint0_linear_15006_6" x1="64.9466" y1="-28.7139" x2="64.9467" y2="114.777" gradientUnits="userSpaceOnUse">
         <stop stop-color="#4C5E9D"/>
         <stop offset="1" stop-color="#171836"/>
         </linearGradient>
         <linearGradient id="paint1_linear_15006_6" x1="65.0794" y1="0.154053" x2="65.0794" y2="90.1541" gradientUnits="userSpaceOnUse">
         <stop stop-color="#3F458D" stop-opacity="0.63"/>
         <stop offset="1" stop-color="#3F458D" stop-opacity="0.14"/>
         </linearGradient>
         <clipPath id="clip0_15006_6">
         <rect width="60" height="60" fill="white" transform="translate(50.5899 15) rotate(40.0283)"/>
         </clipPath>
         </defs>
         </svg>
      </div>      
      <div class="start-page__info">
         <h1 class="start-page__title">Выучи английский язык вместе с RS-lang</h1>
         <h3 class="start-page__subtitle">Нескучное онлайн-обучение английскому языку с помощью игр и интересных
            заданий в любое удобное для вас время!</h3>
         <p class="start-page__text">Библиотека из 4-х тысяч слов, которые можно отсортировать по популярности и
            сложности.</p>
            <div class="start-page__chips">
            <h4>У нас есть:</h4>
               <ul class="start-page__list">
                  <li class="start-page__item">Мини-игры</li>
                  <li class="start-page__item">Уровни сложности</li>
                  <li class="start-page__item">Словарь</li>
                  <li class="start-page__item">Статистика</li>
               </ul>
            </div>
      </div>
   </div>
</div>`;
    (<HTMLElement>document.querySelector(".main__container")).prepend(PAGE);
  }

  teamPage() {
    if (document.querySelector(".team-page")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("team-page");
    PAGE.innerHTML = `            
    <div class="team-page">
   <h3 class="team-page__title">Наша команда</h3>
   <div class="team-page__body">
      <div class="team-page__item">
         <div class="team-page__picture"><img class="team-page__img"
               src="https://avatars.githubusercontent.com/u/52502654?v=4" alt="">
         </div>
         <h4 class="team-page__sub-title">Наш team-leader <a href="https://github.com/RockStar666by"
               target="_blank">Артём</a></h4>
         <p class="team-page__text">
            Занимался тем и тем Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eveniet,
            libero dignissimos aut
            labore ex nulla maiores alias necessitatibus cupiditate optio voluptate voluptas harum
            temporibus, officiis incidunt rerum quae reiciendis.
         </p>

      </div>
      <div class="team-page__item">
         <div class="team-page__picture"><img class="team-page__img"
               src="https://avatars.githubusercontent.com/u/90386861?v=4" alt="">
         </div>

         <h4 class="team-page__sub-title">Front-end разработчик - <a href="https://github.com/OstapchelaEst"
               target="_blank">Дмитрий</a></h4>
         <p class="team-page__text">
            Занимался тем и тем Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eveniet,
            libero dignissimos aut
            labore ex nulla maiores alias necessitatibus cupiditate optio voluptate voluptas harum
            temporibus, officiis incidunt rerum quae reiciendis.
         </p>

      </div>
      <div class="team-page__item">
         <div class="team-page__picture"><img class="team-page__img"
               src="https://avatars.githubusercontent.com/u/96074310?v=4" alt="">
         </div>

         <h4 class="team-page__sub-title">Front-end разработчик - <a href="https://github.com/LenaStask"
               target="_blank">Елена</a></h4>
         <p class="team-page__text">
            Занимался тем и тем Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eveniet,
            libero dignissimos aut
            labore ex nulla maiores alias necessitatibus cupiditate optio voluptate voluptas harum
            temporibus, officiis incidunt rerum quae reiciendis.
         </p>

      </div>
      <div class="team-page__item">
         <div class="team-page__picture"><img class="team-page__img"
               src="https://avatars.githubusercontent.com/u/50177907?v=4" alt="">
         </div>

         <h4 class="team-page__sub-title">Front-end разработчик - <a href="https://github.com/teame92"
               target="_blank">Кирилл</a></h4>
         <p class="team-page__text">
            Занимался тем и тем Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eveniet,
            libero dignissimos aut
            labore ex nulla maiores alias necessitatibus cupiditate optio voluptate voluptas harum
            temporibus, officiis incidunt rerum quae reiciendis.
         </p>

      </div>
   </div>
   <p class="team-page__sub-text">
      Вместе мы трудились не покладая рук, чтоб ты смог учть англйиский комфортно и весело!
   </p>
</div>`;
    (<HTMLElement>document.querySelector(".main__container")).append(PAGE);
  }
  functionalPage() {
    if (document.querySelector(".we-prepared")) return;
    const PAGE = document.createElement("div");
    PAGE.classList.add("we-prepared");
    PAGE.innerHTML = `
    <div class="functional">
    <h3 class="functional__title">Функционал</h3>
    <p class="functional__info">Зарегестрируйся, чтоб получить все возможности</p>
    <div class="functional__body">
       <div class="functional__item">
          <div class="functional__sub-title">Учебник</div>
          <div class="functional__text">
             Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной
             навигацией.
          </div>
          <div class="functional__link">
             <a href="">Открыть</a>
          </div>
       </div>
       <div class="functional__item">
          <div class="functional__sub-title">Статистика</div>
          <div class="functional__text">
             Отслеживай свой прогресс в индивидуальной статистике, ставь цели и вдохновляйся на и достижение
             новых результатов каждый день!
          </div>
          <div class="functional__link">
             <a href="">Открыть</a>
          </div>
       </div>
       <div class="functional__item">
          <div class="functional__sub-title">Словарь</div>
          <div class="functional__text">
             Создай свой персональный словарь для изучения слов - добавляй слова, которым хочешь уделить
             особое внимание и удаляй, если слово тебе уже известно.
          </div>
          <div class="functional__link">
             <a href="">Открыть</a>
          </div>
       </div>
       <div class="functional__item">
          <div class="functional__sub-title">Игры</div>
          <div class="functional__text">
             2 увлекательных игры на развитие запоминания слов и восприятия на слух.
          </div>
          <div class="functional__link">
             <a href="">Открыть</a>
          </div>
       </div>
    </div>
 </div>
    `;
    (<HTMLElement>document.querySelector(".main__container")).append(PAGE);
  }

  singIn() {
    const MODAL = document.createElement("div");
    MODAL.classList.add("sing-in");
    MODAL.innerHTML = `
   <div class="sing-in__body">
                  <p class="sing-in__title">Вход в аккаунт</p>
                  <form action="#" class="sing-in__form">
                     <label for="email">Email*</label>
                     <input type="email" autocomplete="on" id="email" class="sing-in__input-email">
                     <label for="password">Пароль*</label>
                     <input type="password" id="password"  class="sing-in__input-password">
                     <p>Ещё не <span class="sing-in__registration">зарегистрировался?</span></p>
                     <button type="submit"  class="sing-in__input-button">Войти</button>
                  </form>
               </div>
   `;
    document.body.append(MODAL);
    setTimeout(() => {
      (<HTMLElement>document.querySelector(".sing-in")).classList.add("active");
    }, 0);
  }
  registration() {
    (<HTMLElement>(
      document.querySelector(".sing-in__body")
    )).innerHTML = `<p class="sing-in__title">Регистрация</p>
      <form action="#" class="registration__form">
      <label for="email">Email*</label>
      <input type="email" autocomplete="on" id="email" class="registration__input-email">
      <label for="password-1">Пароль*</label>
      <input type="password" id="password-1"  class="registration__input-password-1">
      <label for="password">Повторите пароль*</label>
      <input type="password-2" id="password-2"  class="registration__input-password-2">
      <button type="submit"  class="registration__input-button">Зарегистрироваться</button>
   </form>`;
  }
  buildMainPage() {
    this.header();
    this.footer();
    this.startPage();
    this.functionalPage();
    this.teamPage();
  }
}
export const RENDER_BASIC_STRUCTURE = new RenderBasicStructure();
