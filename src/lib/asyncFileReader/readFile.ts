type Driver = "text" | "arrayBuffer" | "dataUrl" | "binaryString";

type ReadFileOptions<D extends Driver = Driver> = {
  driver?: D;
};

type ReaderResult<D extends Driver> = D extends "arrayBuffer"
  ? ArrayBuffer
  : string;

const defaultFileOptions: ReadFileOptions = {
  driver: "text",
};

export function readFile<D extends Driver = "text">(
  file: File,
  options?: ReadFileOptions<D>
): Promise<ReaderResult<D> | null | undefined> {
  const { driver } = { ...defaultFileOptions, ...options };
  const fileReader = new FileReader();

  function read() {
    if (driver === "arrayBuffer") {
      fileReader.readAsArrayBuffer(file);
      return;
    }
    if (driver === "binaryString") {
      fileReader.readAsBinaryString(file);
      return;
    }
    if (driver === "dataUrl") {
      fileReader.readAsDataURL(file);
      return;
    }
    fileReader.readAsText(file);
  }

  return new Promise((resolve, reject) => {
    fileReader.onloadend = (data) => {
      resolve(data.target?.result as ReaderResult<D> | null | undefined);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    read();
  });
}
