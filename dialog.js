/*framework by me, cowork with ChatGPT*/
class dialog{
  
  static #fdialog = () => {
    let dlog = document.createElement("dialog");
    dlog.style.border = "none";
    dlog.style.borderRadius = "1rem";
    dlog.style.padding = "1.5rem";
    
    let text = document.createElement("pre");
    
    let promises = document.createElement("div");
    promises.style.display = "flex";
    promises.style.gap = "1rem";
    promises.style.color = "yellow";
    promises.style.textAlign = "center";
    
    let reject = document.createElement("div");
    reject.textContent = `✗`;
    reject.style.backgroundColor = "red";
    reject.style.borderRadius = "0.75rem";
    reject.style.flex = "1";
    
    let resolve = document.createElement("div");
    resolve.textContent = `✔`;
    resolve.style.backgroundColor = "green";
    resolve.style.borderRadius = "0.75rem";
    resolve.style.flex = "1";

    promises.append(reject, resolve);
    dlog.append(text, promises);
    
    dialog.#fdialog = () => {
      if(dlog.isConnected){
        return dlog;
      }else{
        document.body.append(dlog);
        return dlog;
      }
    };

    return dialog.#fdialog();
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
