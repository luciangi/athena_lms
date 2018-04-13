import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import "typeface-roboto";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./app.css";
import { Provider } from "react-redux";
import store from "./redux/store"
import { createMuiTheme } from "material-ui";
import Layout from "./components/Layout";

injectTapEventPlugin();

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider theme={createMuiTheme()}>
            <Layout/>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
