const isDev = false;
const serverUrl = isDev
  ? "http://localhost:5000/api/"
  : "https://facez-test.herokuapp.com/api/";

export const links = {
  assets: `${serverUrl}assets`,
};
