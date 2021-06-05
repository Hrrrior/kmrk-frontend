import React from "react";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProgressBar from "../ProgressBar/ProgressBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#424242",
    color: "#fff",
    // marginBottom: 10,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    cursor: "",
  },
  top: {
    margin: "auto",
    display: "block",
    maxWidth: 100,
    maxHeight: 100,
  },
  topGrid: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#121212",
  },
  childGrid: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#424242",
  },
  name: {
    marginTop: 0,
  },
  trackerlink: {
    cursor: "pointer",
  },
  // last: {
  // },
}));

const PlayerMain = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.topGrid}>
      <Grid container spacing={3}>
        <Grid container direction="row" item spacing={3}>
          <Grid item xs={4}>
            <Badge
              className={classes.trackerlink}
              color="secondary"
              badgeContent="R6Tracker"
              onClick={() => window.open(props.trackerurl, "_blank")}
            >
              <img className={classes.img} alt="complex" src={props.img} />
            </Badge>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <h3 className={classes.name}>
                {props.ign} ({props.type})
              </h3>
              <p>LEVEL: {props.level}</p>
              <p>RANK: {props.rank}</p>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>PVP W/L: {props.pvpwl}</Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>PVP K/D: {props.pvpkd}</Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>MMR: {props.mmr}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>PVP Kills: {props.pvpkills}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>PVP Wins: {props.pvpwins}</Paper>
        </Grid>

        <Grid container item spacing={1}>
          {/* <Grid itme xs={3}></Grid> */}
          {/* <Grid itme xs={6}>
            <Paper className={classes.paper}>Top Operators</Paper>
          </Grid> */}
          {/* <Grid itme xs={3}></Grid> */}
          {props.toperators.map((t) => (
            <Tooltip title={t.title} arrow>
              <Grid item xs={4}>
                <img className={classes.top} src={t.img}></img>
              </Grid>
            </Tooltip>
          ))}
        </Grid>
        <Grid classNames={classes.last} item xs={12}>
          {" "}
          <ProgressBar value={props.total}></ProgressBar>{" "}
        </Grid>
      </Grid>
    </Paper>
  );
};

PlayerMain.propTypes = {
  ign: PropTypes.string,
  rank: PropTypes.string,
  mmr: PropTypes.string,
  img: PropTypes.string,
  level: PropTypes.string,
  pvpwl: PropTypes.string,
  pvpkd: PropTypes.string,
  pvpkills: PropTypes.string,
  pvpwins: PropTypes.string,
  toperators: PropTypes.array,
};

PlayerMain.defaultProps = {};

export default PlayerMain;
