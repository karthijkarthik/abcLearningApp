import React from 'react';
import PropTypes from 'prop-types';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';

import DialogComponent from '../Dialog';
import Login from '../Login';

const CourseItem = ({
    course,
    isLoggedIn,
    enrolledlist,
    handleAddCourse,
    handleDeleteCourse
}) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const { id, name, category, price, photo } = course;

    const validateLogin = () => {
        if(isLoggedIn) {
            handleAddCourse(id);
        } else {
            setOpen(true);
        }
    }

    return (
        <div className="courseItem">
            <GridListTile key={id} cols={1}>
                <img src={photo} alt={name} />
                <GridListTileBar 
                    title={name}
                    subtitle={
                        <div className="subTitle">
                            <span>Category : {category}</span>
                            <span>₹{price}</span>
                        </div>
                    }
                    actionIcon={
                        <IconButton aria-label={`info about ${name}`} title="Click to Enroll">
                            {!enrolledlist.includes(id) ?
                                <AddToQueueIcon className="icon" onClick={validateLogin} />
                                : <RemoveFromQueueIcon className="icon" onClick={() => handleDeleteCourse(id)} />
                            }
                        </IconButton>
                    }
                />
            </GridListTile>
            {!isLoggedIn &&
                <DialogComponent open={open} title="Login" onClose={handleClose}>
                    <Login courseId={id} />
                </DialogComponent>
            }
        </div>
    );
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired,
    userDetail: PropTypes.object,
    handleAddCourse: PropTypes.func.isRequired,
    handleDeleteCourse: PropTypes.func.isRequired
}

export default CourseItem;