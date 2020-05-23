import React from 'react';
import './chat-placeholder.styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Skeleton from '@material-ui/lab/Skeleton';
import CardContent from '@material-ui/core/CardContent';

const ChatPlaceHolder = () => {
    const useStyles = makeStyles((theme) => ({
        card: {
            maxWidth: 500,
        },
        media: {
            height: 320,
        },
    }));
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circle" width={20} height={20} />
                }
                title={

                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                }
            />
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <CardContent>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }}/>
                <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
        </Card>
    )
}

export default ChatPlaceHolder;