import { useState } from "react";
import routeConfig from "./Route";
import { BrowserRouter, useRoutes } from "react-router-dom";
import TimezoneProvider from "./component/TimeZoneProvider";
import "./App.css";

function AppRoutes() {
  const rotue = useRoutes(routeConfig);
  return rotue;
}
function App() {
  return (
    <>
      <TimezoneProvider>
        <BrowserRouter basename="/HunchoScores">
          <AppRoutes />
        </BrowserRouter>
      </TimezoneProvider>
    </>
  );
}

export default App;
