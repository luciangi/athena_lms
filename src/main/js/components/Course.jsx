import React from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Typography,
    withStyles
} from "material-ui";

const styles = {
    card: {
        width: "100%"
    },
    media: {
        height: 700
    },
    containingPaper: {
        width: "100%"
    },
    card2: {
        width: "100%",
        flex: 1
    },
    grid: {
        display: "flex",
        flexWrap: "wrap"
    },
    box: {
        width: 400,
        marginLeft: 10,
        marginTop: 10
    },
    image: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        height: 384
    }
};

export default withStyles(styles)(({ children, course, classes }) => (
    <Card className={classes.box}>
        <CardMedia
            className={classes.image}
            image={`data:image/png;base64,${course.image}`}
            title="Contemplative Reptile"
        />
        <Divider/>
        <CardContent className={classes.cardContent}>
            <Chip
                avatar={<Avatar>{course.subject.name.substring(0, 2)}</Avatar>}
                label={course.subject.name}
            />
            <br/>
            <br/>
            <Typography variant="display2" component="span">
                {course.name}
            </Typography>
            <br/>
            <br/>
            <Typography variant="display1" component="span">
                {course.description}
            </Typography>
            <br/>
            <Typography variant="subheading" component="span">
                {`By: ${course.author.firstName} ${course.author.lastName}`}
            </Typography>
        </CardContent>
        <CardActions>
            {children}
        </CardActions>
    </Card>))
