import { createStyles, makeStyles, TextField, Theme, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: `50px`,
        },
        '&:hover fieldset': {
            borderColor: '#3574f2',
        },
      },
    },
  })(TextField);

export default function Searchbar(props) {
    
    return (
        <Autocomplete
            id="search-input-textfield"
            freeSolo
            options={['Ryerson University', 'York University','University of Toronto']}
            renderInput={(params) => (
                <CustomTextField
                    {...params} 
                    placeholder={`Search "CPS100 University of Toronto"...`} 
                    margin="normal" 
                    variant="outlined" 
                    size="medium"
                />
            )}
            />
    )
}