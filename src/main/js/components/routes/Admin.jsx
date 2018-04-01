import React from "react";
import {
    Card,
    CardHeader,
    CardText,
    CardTitle,
    FlatButton,
    Paper,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui";
import {
    ActionHttp,
    ActionSettings,
    FileFolder,
    NotificationNetworkCheck,
    SocialGroup,
    SocialSchool
} from "material-ui/svg-icons/index";
import { SocialPersonOutline } from "material-ui/svg-icons/index.es";


const Admin = () => {
    return (
        <div>
            <br/>
            <Paper zDepth={2} style={{ height: "100%" }}>
                <Card>
                    <CardHeader
                        title="Username"
                        avatar={<SocialPersonOutline/>}
                    />
                    <CardTitle title="Administrator management panel"/>
                    <CardText>
                        <br/>
                        <Card>
                            <CardHeader
                                title="API"
                                subtitle="API Management"
                                avatar={<ActionSettings/>}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <FlatButton
                                    label="Swagger UI"
                                    labelPosition="before"
                                    secondary={true}
                                    icon={<ActionHttp/>}
                                    href="/swagger-ui.html"
                                />
                                <FlatButton
                                    label="Actuator endpoints"
                                    labelPosition="before"
                                    secondary={true}
                                    icon={<NotificationNetworkCheck/>}
                                    href="/actuator"
                                />
                            </CardText>
                        </Card>
                        <br/>
                        <Card>
                            <CardHeader
                                title="Tutors"
                                subtitle="Tutors Management"
                                avatar={<SocialSchool/>}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>ID</TableHeaderColumn>
                                            <TableHeaderColumn>Name</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableRowColumn>1</TableRowColumn>
                                            <TableRowColumn>John Smith</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>2</TableRowColumn>
                                            <TableRowColumn>Randal White</TableRowColumn>
                                            <TableRowColumn>Unemployed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>3</TableRowColumn>
                                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>4</TableRowColumn>
                                            <TableRowColumn>Steve Brown</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>5</TableRowColumn>
                                            <TableRowColumn>Christopher Nolan</TableRowColumn>
                                            <TableRowColumn>Unemployed</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                        <br/>
                        <Card>
                            <CardHeader
                                title="Students"
                                subtitle="Students Management"
                                avatar={<SocialGroup/>}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>ID</TableHeaderColumn>
                                            <TableHeaderColumn>Name</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableRowColumn>1</TableRowColumn>
                                            <TableRowColumn>John Smith</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>2</TableRowColumn>
                                            <TableRowColumn>Randal White</TableRowColumn>
                                            <TableRowColumn>Unemployed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>3</TableRowColumn>
                                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>4</TableRowColumn>
                                            <TableRowColumn>Steve Brown</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>5</TableRowColumn>
                                            <TableRowColumn>Christopher Nolan</TableRowColumn>
                                            <TableRowColumn>Unemployed</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                        <br/>
                        <Card>
                            <CardHeader
                                title="Subjects"
                                subtitle="Subjects Management"
                                avatar={<FileFolder/>}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>ID</TableHeaderColumn>
                                            <TableHeaderColumn>Name</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableRowColumn>1</TableRowColumn>
                                            <TableRowColumn>John Smith</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>2</TableRowColumn>
                                            <TableRowColumn>Randal White</TableRowColumn>
                                            <TableRowColumn>Unemployed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>3</TableRowColumn>
                                            <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>4</TableRowColumn>
                                            <TableRowColumn>Steve Brown</TableRowColumn>
                                            <TableRowColumn>Employed</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>5</TableRowColumn>
                                            <TableRowColumn>Christopher Nolan</TableRowColumn>
                                            <TableRowColumn>Unemployed</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                        <br/>
                    </CardText>
                </Card>
            </Paper>
        </div>
    )
};

export default Admin
