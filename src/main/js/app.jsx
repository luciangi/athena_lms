import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import "typeface-roboto";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import "./app.css";
import { Provider } from "react-redux";
import store from "./redux/store"
import Layout from "./components/Layout";

injectTapEventPlugin();

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Layout/>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
