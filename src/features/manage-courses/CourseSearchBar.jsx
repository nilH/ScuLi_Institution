import React from "react";
import { Search} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {searchCourse} from './courseManageActions';


export default function CourseSearchBar() {
  const {courses,searchValue,selectedTerm,terms} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const handleSearchChange = (e, data) => {
    //debugger; // eslint-disable-line no-debugger
    if (data.value.length === 0) {
      dispatch(searchCourse([],data.value,selectedTerm,terms.find((term)=>term.id===selectedTerm)));
    }

    const re = new RegExp(data.value);
    const isMatch = (result) => re.test(result.name.toLowerCase());
    dispatch(searchCourse(courses.filter(isMatch),data.value,selectedTerm));
  };

  return (
    <Search
      onSearchChange={handleSearchChange}
      value={searchValue}
      showNoResults={false}
    />
  );
}
