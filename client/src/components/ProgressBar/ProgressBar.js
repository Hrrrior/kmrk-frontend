import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import Box from "@material-ui/core/Box";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#f50057",
  },
}))(LinearProgress);

const ProgressBar = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="body2"
        color="secondary"
      >{`Trial progress...`}</Typography>
      <Box width="100%" mr={1}>
        <BorderLinearProgress
          color="secondary"
          variant="determinate"
          value={props.value}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
ProgressBar.propTypes = {};

ProgressBar.defaultProps = {};

export default ProgressBar;
