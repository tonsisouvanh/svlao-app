import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_en from "./translations/en/global_en.json";
import global_vn from "./translations/vn/global_vn.json";
import global_la from "./translations/la/global_la.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "la",
  resources: {
    la: {
      global: global_la,
    },
    en: {
      global: global_en,
    },
    vn: {
      global: global_vn,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
