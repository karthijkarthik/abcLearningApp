import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import { connect } from 'react-redux';

import { FetchCourse } from "./fetchCourse";
import CourseItem from './courseItem';
import './courses.css';
import { getEnrolledCourse, addCourse, deleteCourse } from '../../Actions/actionCreators';

const Courses = ({
  userDetail,
  globalState,
  dispatchAddCourseId,
  dispatchDeleteCourseId
}) => {
  const storedUser = localStorage.getItem('abclearningAppUser') ? JSON.parse(localStorage.getItem('abclearningAppUser')) : {};
  const userCourses = getEnrolledCourse(storedUser.loggedUser);
  //const enrolledCourses = userCourses.then(res => res[0].enrolledCourse);
  
  console.log('userCourses', userCourses);
  //console.log('enrolledCourses', enrolledCourses);

  const data = FetchCourse("http://localhost:3000/courses/");
  const { courses } = data;
  return (
    <div className="courseContainer">
      <GridList cellHeight={160} cols={3}>
        {
          courses && courses.map(item => 
            <CourseItem 
              key={item.id} 
              course={item} 
              isLoggedIn={storedUser && storedUser.loggedUser !== ''}
              enrolledlist=''
              handleAddCourse={dispatchAddCourseId} 
              handleDeleteCourse={dispatchDeleteCourseId}
            />)
        }
      </GridList>
    </div>
  );
}

Courses.propTypes = {
  userDetail: PropTypes.object.isRequired,
  globalState: PropTypes.object.isRequired,
  dispatchAddCourseId: PropTypes.func.isRequired,
  dispatchDeleteCourseId: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userDetail: state.userDetails,
  globalState: state.globalState
});

const mapDispatchToProps = {
  dispatchAddCourseId: addCourse,
  dispatchDeleteCourseId: deleteCourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);