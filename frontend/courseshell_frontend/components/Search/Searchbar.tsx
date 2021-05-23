import { Box, CircularProgress, createStyles, Grid, IconButton, makeStyles, Snackbar, TextField, Theme, Tooltip, Typography, withStyles } from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { gql, useLazyQuery } from "@apollo/client";
import schoolData from './data/university.json';
import SearchDialog from './SearchDialog';
import { SchoolContext } from '../../contexts/SchoolContext';
import Link from 'next/link';

export const COURSE_QUERY = gql `
query ($school: String!, $code: String!) {
    courses(university_Name_Icontains: $school, code_Icontains: $code) {
      edges {
        node {
          id,
          uuid,
          code,
          university {
            name,
            country
          }
        }
      }
    }
  }
`;

export const SCHOOL_QUERY = gql `
query ($name: String) {
    university(name: $name, universityUuid: "", slug: "") {
      name
      slug
      absoluteUrl
    }
  }
`

interface UniversityType {
    name: string
}

interface CourseType {
    code: string
}

interface SearchSnackbarProps {
    severity: string
    open: boolean
    message: string
}

interface SearchbarProps {
    graphqlClient: any
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

function SearchSnackbar(props) {

    const [open, setOpen] = React.useState(props.open); 

    useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal:'center' }} 
            open={open} autoHideDuration={5000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
                {props.message}
            </Alert>    
        </Snackbar>
    )
}

export default function Searchbar(props: SearchbarProps) {

    const [school, setSchool] = React.useState(null);
    const [course, setCourse] = React.useState(null);
    const [courseOptions, setCourseOptions] = React.useState([]);
    const [schoolOptions, setSchoolOptions] = React.useState([]);
    const [schoolObject, setSchoolObject] = React.useState({});
    const [schoolURL, setSchoolURL] = React.useState('');
    const [searchSnackbarState, setSearchSnackbarState] = React.useState({
        open: false,
        severity: '',
        message: '',
    })
    const [schoolContextValue, setSchoolContextValue] = React.useContext(SchoolContext);

    const handleSchoolDataRetrieved = (data) => {
        const url = data.university.absoluteUrl;
        const obj = data.university;
        setSchoolObject(obj);
        setSchoolURL(url);
    }

    const handleSchoolDataRetrievalError = (error) => {
        setSearchSnackbarState({
            open: true,
            severity: "error",
            message: `There was an error finding information on ${school}`
        })
    }

    const handleCourseDataRetrieved = (data) => {
        const courses = data.courses.edges.map(course => {
            return course.node
        }) 
        setCourseOptions([
            ...courses
        ]);
    }

    const handleCourseDataRetrievalError = (error) => {
        setSearchSnackbarState({
            open: true,
            severity: "error",
            message: "There was an error retrieving courses"
        })
    }

    const [getCourses, {loading: coursesDataLoading, error: coursesDataError, data: coursesData}] = useLazyQuery(COURSE_QUERY, {
        client: props.graphqlClient,
        onCompleted: handleCourseDataRetrieved,
        onError: handleCourseDataRetrievalError
    });

    const [getSchool, {loading: schoolLoading, error: schoolError, data: schoolObjectData}] = useLazyQuery(SCHOOL_QUERY, {
        client: props.graphqlClient,
        onCompleted: handleSchoolDataRetrieved,
        onError: handleSchoolDataRetrievalError
    });

    const handleCourseInputChange = (val) => {
        setCourse(val);
    }

    const handleCourseInputOnClick = () => {
        if(school == null || school == '') {
            setSearchSnackbarState({
                open: true,
                severity: "error",
                message: "Please select your school first"
            });
        } else {
            if(course !== null && course.length >= 3) {
                getCourses({variables: {
                    code: course,
                    school: school
                }})
            }
        }
    }

    const handleSchoolInputChange = (val) => {
        setSchool(val);
        setSchoolContextValue(val);
        setCourseOptions([]);
    }

    useEffect(() => {
        const universities = schoolData.map(school => {
            return school.name
        });
        setSchoolOptions([...universities]);
        setSchool(schoolContextValue);
    }, []);

    useEffect(() => {
        if(school != null && school != '') {
            getSchool({variables: {
                name: school
            }});
        }
    }, [school]);

    useEffect(() => {
        if(course !== null && course.length >= 3) {
            getCourses({variables: {
                code: course,
                school: school
            }})
        } else if(course === null || course === '') {
            setCourseOptions([]);
        }
    }, [course])
    
    return (  
        <div>
            <Box display={{ xs: 'none', sm: 'block' }}>
                <Grid container spacing={0}>
                    <SearchSnackbar {...searchSnackbarState}/>
                    <Grid item xs={6}>
                        <Autocomplete
                            id="search-input-school-textfield"
                            options={schoolOptions}
                            noOptionsText="No school found"
                            onChange={(e, val) => handleSchoolInputChange(val)}
                            renderInput={(params) => (
                                <CustomLeftTextField
                                    {...params} 
                                    placeholder={`School name`} 
                                    margin="normal" 
                                    variant="outlined" 
                                    size="medium"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>        
                        <Autocomplete
                            id="search-input-course-textfield"
                            freeSolo
                            noOptionsText="No course found"
                            loading={coursesDataLoading}
                            disabled={school === null || school === ''}
                            options={courseOptions}
                            getOptionSelected={(option, value) => option.code === value.code}
                            getOptionLabel={(option) => option.code}
                            onChange={(e, val) => handleCourseInputChange(val)}
                            renderInput={(params) => (
                                <Tooltip title={school === null || school === '' ? "Select school first" : ""}>
                                    <span>
                                        <CustomRightTextField
                                            {...params} 
                                            placeholder={`Course code`} 
                                            margin="normal" 
                                            variant="outlined" 
                                            size="medium"
                                            value={course}
                                            onChange={e => handleCourseInputChange(e.target.value)}
                                            onClick={handleCourseInputOnClick}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                <React.Fragment>                          
                                                    <IconButton size="small" disabled={school === null || school === '' || course === '' || course == null}>
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
                    <Grid item xs={12}>           
                        <Box  p={1} display="flex" justifyContent="center">
                                <div style={{minHeight: '36px'}}>
                                    {school !== null ?
                                        <Typography variant="subtitle1">
                                            Find a course at &nbsp;
                                            <Link 
                                                href={{
                                                    pathname: '/school/[slug]/',
                                                    query: schoolURL
                                                }}>
                                                <b>{school}</b>
                                            </Link>
                                        </Typography> 
                                    :""}
                                    {schoolLoading ? <CircularProgress size={18} color="primary" /> : ""}
                                </div>
                        </Box>              
                    </Grid>
                </Grid>
            </Box>
            <Box display={{ xs: 'block', sm:'none' }}>
                <SearchDialog graphqlClient={props.graphqlClient} style="textfield" />
            </Box>
        </div>
    )
}