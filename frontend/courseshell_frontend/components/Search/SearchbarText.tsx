import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function SearchbarText() {
    return (
        <Box width="100%" display="flex" flexDirection="column" justifyContent="center">
            <Typography  align="center" variant="h3" color="primary">
                Explore courses easily, everywhere
            </Typography>
            <Box mt={1} mb={2} color="text.disabled">
                <Typography align="center" variant="subtitle2">
                    See course reviews, see different and find groups for each course
                </Typography>
            </Box>
        </Box>
    )
}