class ComponentLoadScrean {
  renderLoadScrean() {
    const BLOCK = document.createElement("div");
    BLOCK.classList.add("load-screan");
    BLOCK.innerHTML = `
    <div class="load-screan__img">
    </div>
    `;
    document.body.append(BLOCK);
  }
  removeLoadScrean() {
    if (document.querySelector(".load-screan")) {
      (<HTMLElement>document.querySelector(".load-screan")).remove();
    }
  }
}

export const COMPONENT_LOAD_SCREAN = new ComponentLoadScrean();
