import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WritualContext from "./WritualContext";
import { App, contextValue } from './App';

const Wrapper = ({ children }) => {
  return (
    <WritualContext.Provider value={contextValue}>
      <MemoryRouter>{children}</MemoryRouter>
    </WritualContext.Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };