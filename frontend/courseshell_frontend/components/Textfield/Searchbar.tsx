import { Box, CircularProgress, createStyles, Grid, IconButton, makeStyles, TextField, Theme, Tooltip, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { gql, useLazyQuery, useMutation } from "@apollo/client";

interface UniversityType {
    name: string
}

interface CourseType {
    code: string
}

const CustomLeftTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderTopLeftRadius: '50px',
            borderBottomLeftRadius: '50px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px',
        },
        '&:hover fieldset': {
            borderColor: '#3574f2',
        },
      },
    },
  })(TextField);

  const CustomRightTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderTopRightRadius: '50px',
            borderBottomRightRadius: '50px',
        },
        '&:hover fieldset': {
            borderColor: '#3574f2',
        },
      },
    },
  })(TextField);

export default function Searchbar(props) {


    const [course, setCourse] = React.useState(null);
    const [university, setUniversity] = React.useState(null);
    const [courseInputValue, setCourseInputValue] = React.useState(null);
    const [universityInputValue, setUniversityInputValue] = React.useState(null);
    const [courseOptions, setCourseOptions] = React.useState([]);
    const [universityOptions, setUniversityOptions] = React.useState([]);
    const [courseListOpen, setCourseListOpen] = React.useState(false);
    const [universityListOpen, setUniversityListOpen] = React.useState(false);

    const query = gql `query { user { id } }`;

    const handleUniversityDataRetrieved = (data) => {

    }

    const handleUniversityDataRetrivalError = (error) => {

    }

    const handleCourseDataRetrieved = (data) => {

    }

    const handleCourseDataRetrivalError = (data) => {

    }

    const [getUniversities, {loading: universityDataLoading, error: universityDataError, data: universityData}] = useLazyQuery(query, {
        client: props.gqlClient,
        onCompleted: handleUniversityDataRetrieved,
        onError: handleUniversityDataRetrivalError
    });

    const [getCourses, {loading: coursesDataLoading, error: coursesDataError, data: coursesData}] = useLazyQuery(query, {
        client: props.gqlClient,
        onCompleted: handleCourseDataRetrieved,
        onError: handleCourseDataRetrivalError
    });

    const handleCourseInputChange = (val) => {
        setCourseInputValue(val);
    }

    const handleUniversityInputChange = (val) => {
        setUniversityInputValue(val);
    }

    useEffect(() => {
        getUniversities({variables: {
            name: universityInputValue
        }})
    }, [universityInputValue]);

    useEffect(() => {
        getCourses({variables: {
            code: courseInputValue
        }})
    }, [courseInputValue])
    
    return (
        <Grid container spacing={0}>
            <Grid item xs={6}>
                <Autocomplete
                id="search-input-university-textfield"
                freeSolo
                loading={universityDataLoading}
                options={universityOptions}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <CustomLeftTextField
                        {...params} 
                        placeholder={`School name`} 
                        margin="normal" 
                        variant="outlined" 
                        size="medium"
                        value={universityInputValue}
                        onChange={e => handleUniversityInputChange(e.target.value)}
                    />
                )}
                />
            </Grid>
            <Grid item xs={6}>        
                <Autocomplete
                    id="search-input-course-textfield"
                    freeSolo
                    loading={coursesDataLoading}
                    disabled={universityInputValue === null || universityInputValue === ''}
                    options={courseOptions}
                    getOptionSelected={(option, value) => option.code === value.code}
                    getOptionLabel={(option) => option.code}
                    renderInput={(params) => (
                        <Tooltip title={universityInputValue === null || universityInputValue === '' ? "Select school first" : ""}>
                            <span>
                                <CustomRightTextField
                                    {...params} 
                                    placeholder={`Course code`} 
                                    margin="normal" 
                                    variant="outlined" 
                                    size="medium"
                                    value={courseInputValue}
                                    disabled={universityInputValue === null || universityInputValue === ''}
                                    onChange={e => handleCourseInputChange(e.target.value)}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                        <React.Fragment>                          
                                            <IconButton size="small">
                                                <SearchIcon />
                                            </IconButton>    
                                            {params.InputProps.endAdornment}               
                                        </React.Fragment>
                                        ),
                                    }}
                                />
                            </span>
                        </Tooltip>           
                     )}
                />
            </Grid>
        </Grid>
        
    )
}