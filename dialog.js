/*framework by me, cowork with ChatGPT*/
class dialog{
  
  static #fdialog = () => {
    let dlog = document.createElement("dialog");
    dlog.style.border = "none";
    dlog.style.borderRadius = "1rem";
    dlog.addEventListener(
      "cancel", e => {
        e.preventDefault();
      }
    );
    
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
    reject.addEventListener(
      "pointerdown",
      (e) => {
        dlog.close(`✗`);
      };
    );
    
    
    let resolve = document.createElement("div");
    resolve.textContent = `✔`;
    resolve.style.backgroundColor = "green";
    resolve.style.borderRadius = "0.75rem";
    resolve.style.flex = "1";
    reslove.addEventListener(
      "pointerdown",
      (e) => {
        dlog.close(`✔`);
      };
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
          dlog.showModel();
          
          dlog.addEventListener(
            "close",
            (e) => {
              switch(dlog.returnValue){
                case `✗`:
                  reject();
                  break;
                case `✔`:
                  reslove();
                  break;
                default:
                  //Promise stay pending
                  break;
              }
            },
            { once:true }
          );
        }
      );
    };
    
    dialog.#fdialog = () => {
      if(dlog.isConnected){
        return universe_dialog;
      }else{
        document.body.append(dlog);
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
