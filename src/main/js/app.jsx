import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import "typeface-roboto";
import { Provider } from "react-redux";
import store from "./store"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import Main from "./components/Main";

injectTapEventPlugin();

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Main/>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);