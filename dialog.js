/*framework by me, cowork with ChatGPT*/
class dialog{
  
  static #fdialog = () => {
    let dlog = document.createElement("dialog");
    dlog.style.border = "none";
    dlog.style.borderRadius = "1rem";
    dlog.style.padding = "1.5rem";
    dlog.style.textAlign = "center";
    document.body.append(dlog);
    dialog.#fdialog = () => dlog;
  };

  static #fbutton(text, bgcolor, fpointerdown) {
    const div = document.createElement("div");
    
    div.textContent = text;
    div.style.backgroundColor = bgcolor;
    div.style.borderRadius = "0.75rem";
    div.style.padding = "0.6rem 1.2rem";
    div.style.textAlign = "center";
    div.style.cursor = "pointer";
    div.style.userSelect = "none";
    
    div.addEventListener(
      "pointerdown", 
      fpointerdown
    );
    
    return div;
  }


  

  static alert(info){
    
  }
  
}
