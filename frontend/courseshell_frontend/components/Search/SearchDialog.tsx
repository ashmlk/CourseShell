import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Box, TextField, Tooltip, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { gql, useLazyQuery } from "@apollo/client";
import schoolData from './data/university.json';
import SearchIcon from '@material-ui/icons/Search';

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

interface SearchDialogProps {
    style: string
    graphqlClient: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '50px',

        },
        '&:hover fieldset': {
            borderColor: '#3574f2',
        },
      },
    },
  })(TextField);


export default function SearchDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [school, setSchool] = React.useState(null);
  const [course, setCourse] = React.useState(null);
  const [courseOptions, setCourseOptions] = React.useState([]);
  const [schoolOptions, setSchoolOptions] = React.useState([]);
  const [searchSnackbarState, setSearchSnackbarState] = React.useState({
      open: false,
      severity: '',
      message: '',
  })

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
        setCourseOptions([]);
    }

    useEffect(() => {
        const universities = schoolData.map(school => {
            return school.name
        });
        setSchoolOptions([...universities]);
    }, []);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOpenButton = () => {
    let buttonComponent = null;
    switch (props.style) {
        case "textfield":
            buttonComponent = (
                <CustomTextField variant="outlined" fullWidth disabled={true} onClick={handleClickOpen} placeholder="Search..." />
            )
            break;
        case "icon-button":
            buttonComponent = (
                <IconButton onClick={handleClickOpen}>
                    <SearchIcon />
                </IconButton>
            )
            break;
        case "button":
            buttonComponent = <Button onClick={handleClickOpen} color="primary" variant="contained">Search</Button>
            break;
        default:
            buttonComponent = <Button onClick={handleClickOpen} color="primary" variant="contained">Search</Button>
            break;
    }

    return buttonComponent;
  }

  return (
    <div>
      {getOpenButton()}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Search
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
            <Box mx={1}>
                <Autocomplete
                        id="search-input-school-textfield"
                        options={schoolOptions}
                        noOptionsText="No school found"
                        onChange={(e, val) => handleSchoolInputChange(val)}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params} 
                                placeholder={`School name`} 
                                margin="normal" 
                                variant="outlined" 
                                size="medium"
                            />
                        )}
                    />
            </Box>
            <Box mx={1}>
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
                                <CustomTextField
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
            </Box>
            <Box p={1} display="flex" justifyContent="center">
                    <div style={{minHeight: '36px'}}>
                        {school !== null ?
                            <Typography variant="subtitle1">
                                Find a course at <b>{school}</b>
                            </Typography>  
                        :""}
                    </div>
            </Box>  
        </Box>
      </Dialog>
    </div>
  );
}