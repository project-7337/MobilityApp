import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



if (localStorage.getItem("theme") === "dark") {
  require("@elastic/eui/dist/eui_theme_dark.css");
  require("@elastic/charts/dist/theme_dark.css");
} else {
  require("@elastic/eui/dist/eui_theme_dark.css");
  require("@elastic/eui/dist/eui_theme_light.css");
  require("@elastic/charts/dist/theme_light.css");
}

const setTheme = theme => {
  localStorage.setItem("theme", theme);
  window.location.reload();
};

ReactDOM.render(
  <React.StrictMode>
    <App setTheme={setTheme} />
  </React.StrictMode>,
  document.getElementById('root')
);
