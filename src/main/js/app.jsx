import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import MyAwesomeReactComponent from "./components/MyAwesomeReactComponent";

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <MyAwesomeReactComponent/>
    </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);