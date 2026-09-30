/*framework by me, cowork with ChatGPT*/
class dialog{
  
  static #fdialog = () => {
    let dlog = document.createElement("dialog");
    dlog.style.border = "none";
    dlog.style.outline = "none";
    dlog.style.backgroundColor = "ivory";
    dlog.style.borderRadius = "1rem";
    dlog.addEventListener(
      "cancel", 
      (e) => e.preventDefault()
    );
    dlog.addEventListener(
      "pointerdown",
      (e) => e.stopPropagation()
    );
    
    let text = document.createElement("pre");
    text.style.fontSize = "1.1rem";
    text.style.fontFamily = "monospace";
    text.style.color = "peru";
    
    let promises = document.createElement("div");
    promises.style.display = "flex";
    promises.style.gap = "1rem";
    promises.style.color = "yellow";
    promises.style.textAlign = "center";
    promises.style.fontSize = "1.2rem";
    
    let reject = document.createElement("div");
    reject.textContent = `✗`;
    reject.style.backgroundColor = "red";
    reject.style.borderRadius = "0.25rem";
    reject.style.flex = "1";
    reject.addEventListener(
      "click",
      (e) => dlog.close(`✗`)
    );
    
    
    let resolve = document.createElement("div");
    resolve.textContent = `✔`;
    resolve.style.backgroundColor = "green";
    resolve.style.borderRadius = "0.25rem";
    resolve.style.flex = "1";
    resolve.addEventListener(
      "click",
      (e) => dlog.close(`✔`)
    );

    promises.append(reject, resolve);
    dlog.append(text, promises);

    let universe_dialog = (
      content,
      rejectable
    ) => {
      text.textContent = content;
      reject.hidden = !rejectable;
      return new Promise(
        (resolve,reject) => {
          dlog.addEventListener(
            "close",
            (e) => {
              switch(dlog.returnValue){
                case `✗`:
                  reject();
                  break;
                case `✔`:
                  resolve();
                  break;
                default:
                  //Promise stay pending
                  break;
              }
            },
            { once:true }
          );

          dlog.showModal();
        }
      );
    };
    
    dialog.#fdialog = () => {
      if(dlog.isConnected){
        return universe_dialog;
      }else{
        document.documentElement.append(dlog);
        return universe_dialog;
      }
    };

    return dialog.#fdialog();
  };

  /*
  return a Promise that will be resolved
  NOTE: if Promise pending after dialog close,
  it's a bug.
  */
  static notice(information){
    return dialog.#fdialog()(
      information,
      false
    );
  }

  /*
  return Promise that:
  reslove if ✔
  reject if ✗
  NOTE: if Promise pending after dialog close,
  it's a bug.
  */
  static ask(question){
    return dialog.#fdialog()(
      question,
      true
    );
  }
  
}
