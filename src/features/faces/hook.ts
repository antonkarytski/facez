import { useEffect } from "react";
import { getFaces } from "../../api/request.getFaces";
import { setFaces } from "./model.faces";

export function useFacesInit() {
  useEffect(() => {
    getFaces()
      .then((data) => {
        console.log(data);
        setFaces(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
}
