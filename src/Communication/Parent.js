import React, { useContext } from "react";
import { useState } from "react";
import { Child } from "./Child";
import { Sibling } from "./Sibling";

export function Parent() {
  const [fromChild, setFromChild] = useState(null);
  const [sibling, setSibling] = useState(null);
  const informatie = "Ceva informatie";

  function handleIntamplare(orice) {
    setFromChild(orice);
  }

  function handleSibling(data) {
    setSibling(data);
  }

  return (
    <>
      <h1>Parent Component</h1>
      From child: {fromChild}
      <DemoContextProvider>
        <Child
          info={informatie}
          saIntamplatCeva={handleIntamplare}
          onSibling={handleSibling}
        />
        <Sibling data={sibling} />
      </DemoContextProvider>
    </>
  );
}

const DemoContext = React.createContext();

export function DemoContextProvider({ children }) {
  const [contextState, setContextState] = useState(null);

  return (
    <DemoContext.Provider value={{ contextState, setContextState }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  return useContext(DemoContext);
}
