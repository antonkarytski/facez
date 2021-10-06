import React from "react";
import classes from "./style.module.scss";
import { useFacesInit } from "./features/faces/hook";
import { Switch, useLocation, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import MainPage from "./pages/MainPage";

function App() {
  const location = useLocation();

  useFacesInit();

  return (
    <div className={classes.App}>
      <Switch location={location}>
        <Route path={"/admin"}>
          <AdminPage />
        </Route>
        <Route path={"/"} exact>
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
