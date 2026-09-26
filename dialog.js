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
        dlog.close(Promise.reject());
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
        dlog.close(Promise.reslove());
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
          dlog.addEventListener(
            "close",
            (e) => reslove(dlog.returnValue),
            { once:true }
          );
        }
      ).then(val => val);
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


  

  static alert(info){
    
  }
  
}
