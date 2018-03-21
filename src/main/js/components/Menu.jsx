import React from "react";
import {
    AppBar,
    Drawer,
    MenuItem
} from "material-ui";
import { connect } from "react-redux";
import {
    closeMenu,
    toggleMenu
} from "../actions/actions";

@connect((store) => ({
    open: store.menu.open
}))
class Menu extends React.Component {
    render() {
        return (
            <div>
                <AppBar
                    title="Athena"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={() => this.props.dispatch(toggleMenu())}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.props.open}
                    onRequestChange={() => this.props.dispatch(closeMenu())}>
                    <MenuItem onClick={() => this.props.dispatch(closeMenu())}>Menu Item</MenuItem>
                    <MenuItem onClick={() => this.props.dispatch(closeMenu())}>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default Menu;