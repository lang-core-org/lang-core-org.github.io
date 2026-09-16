/*baseline framework*/
class file{
  
  static of(dir = "downloads"){
    return windows.showDirectoryPicker(
      {
        mode:"readwrite",
        startIn:dir
      }
    ).then(
      (dhandle) => {
        return {
          save_file: file.#writeable(dhandle),
          read_file: file.#readable(dhandle)
        };
      }
    );
  }


  static #writeable(dhandle){
    //save file
    return (file_name, data) => 
      dhandle.getFileHandle(
        file_name,
        { create: true }
      ).then(
        (fhandle) => fhandle.createWritable(
          {
            mode: "exclusive"
          }
        )
      ).then(
        (writer) => writer.write(data).finally(
          (__) => writer.close()
        )
      );
  }
  static #readable(dhandle){
    //read file
    return (file_name) => 
      dhandle.getFileHandle(
        file_name
      ).then(
        (fhandle) => fhandle.getFile()
      );
  }
}
