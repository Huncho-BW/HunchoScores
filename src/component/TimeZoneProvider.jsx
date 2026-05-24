import React, { useState } from "react";
import { TimezoneContext } from "./TimezoneContext";

export default function TimezoneProvider({ children }) {
  const defaulttimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [timezone, setTimezone] = useState(defaulttimeZone);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}
