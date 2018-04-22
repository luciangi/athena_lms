import React from "react";
import * as qs from "query-string";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Paper,
    Typography,
    withStyles
} from "material-ui";

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        width: "1100px"
    },
    media: {
        height: "600px"
    }
};

const erorrTexts = {
    401: "Unauthorized",
    403: "Forbidden",
    500: "Internal Server Error"
};

const GenericError = ({ classes, location }) => {
    const errorStatus = qs.parse(location.search).error;
    return (
        <div className={classes.container}>
            <Paper elevation={1} className={classes.paper}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image="/images/error.jpg"
                        title="Back to school"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            Error {errorStatus} {erorrTexts[ errorStatus ]}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => window.location = "/"}>
                            Go to Home page
                        </Button>
                        <Button onClick={() => window.location = "/"}>
                            Help
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </div>
    )
};

export default withStyles(styles)(GenericError)
