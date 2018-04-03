import React from "react";
import {
    Grid,
    Table,
    TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui/dist/dx-react-grid-material-ui.cjs";
import {
    Paper,
    Typography,
    withStyles
} from "material-ui";

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    })
});

@withStyles(styles)
class Subjects extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        Subjects
                    </Typography>
                    <Grid
                        rows={[
                            { id: 0, product: "DevExtreme", owner: "DevExpress" },
                            { id: 1, product: "DevExtreme Reactive", owner: "DevExpress" }
                        ]}
                        columns={[
                            { name: "id", title: "ID" },
                            { name: "product", title: "Product" },
                            { name: "owner", title: "Owner" }
                        ]}>
                        <Table/>
                        <TableHeaderRow/>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

Subjects.propTypes = {};

export default Subjects
