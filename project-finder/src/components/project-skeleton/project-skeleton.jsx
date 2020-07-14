import React from 'react';
import './project-skeleton.scss';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

const ProjectSkeleton = () => {

    const useStyles = makeStyles((theme) => ({
        card: {
            minWidth: 725,
            margin: theme.spacing(2),
        },
        media: {
            height: 220,
        },
        countSize: {
            minWidth: 725,
            margin: theme.spacing(2),
            height: 60
        }
    }));

    const classes = useStyles();

    const m = [0, 1, 2, 3, 4];

    return (
        <div>
            <div className='skeletonProject'>
                {
                    m.map(i => {
                    return <div>
                            <div className='skeletonProjectCount'>
                                <Skeleton className={classes.countSize} animation="wave" />
                            </div>
                            <Card className={classes.card}>
                                <CardHeader
                                    avatar={
                                        <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                    }
                                    title={
                                        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                    }
                                    subheader={<Skeleton animation="wave" height={10} width="40%" />}
                                />
                                <Skeleton animation="wave" variant="rect" className={classes.media} />
                                <CardContent>
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </React.Fragment>
                                </CardContent>
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ProjectSkeleton;