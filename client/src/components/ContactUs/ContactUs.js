import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Popup from "reactjs-popup";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import { pink } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { dark } from "@material-ui/core/styles/createPalette";

import {
  EMAILJS_SERVICE,
  EMAILJS_TEMPLATE,
  EMAILJS_USER,
} from "../../secret.js";

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
  },

  topGrid: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#121212",
    borderRadius: 20,
    borderColor: "#fff",
    top: "auto",
    right: 15,
    bottom: 60,
    left: "auto",
    position: "fixed",
  },
  childGrid: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    backgroundColor: "#424242",
  },
  margin: {
    margin: theme.spacing(1),
    top: "auto",
    right: 1,
    bottom: 2,
    left: "auto",
    position: "fixed",
  },
  msgBox: {
    color: "#fff",
  },
  popupHead: {
    margin: 0,
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: pink,
    type: "dark",
  },
});
const ContactUs = () => {
  const [msg, setMsg] = useState({ msg: "" });
  const [from, setFrom] = useState({ from: "" });
  const [able, setAble] = useState(true);

  function handleChangeMsg(e) {
    setMsg({ msg: e.target.value });
    // setTimeout(buttonable(msg, from), 1000);
  }

  function handleChangeFrom(e) {
    setFrom({ from: e.target.value });
    // setTimeout(buttonable(msg, from), 1000);
  }

  useEffect(() => {
    buttonable(msg, from);
  }, [msg]);

  useEffect(() => {
    buttonable(msg, from);
  }, [from]);
  function buttonable(a, b) {
    console.log(a);
    console.log(b);
    console.log(a.msg.length);
    console.log(b.from.length);
    if (a.msg.length > 5 && b.from.length > 2) {
      setAble(false);
    } else {
      setAble(true);
    }
  }
  function sendEmail() {
    console.log(msg);
    console.log(from);
    // console.log(`${process.env.REACT_APP_EMAILJS_SERVICE}`);
    emailjs
      .send(
        // "service_e8fq32g",
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          message: msg.msg,
          from_name: from.from,
        },
        EMAILJS_USER
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setAble(true);
  }

  const classes = useStyles();

  return (
    <Popup
      className={classes.root}
      trigger={
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="sendfeedback"
          className={classes.margin}
        >
          Send a message to the team <EmailRoundedIcon />
        </Fab>
      }
      modal
    >
      {(close) => (
        <Paper className={classes.topGrid} border={1}>
          <Grid
            container
            spacing={3}
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <ThemeProvider theme={theme}>
              <Grid xs={12} item>
                <h3 className={classes.popupHead}>
                  Send a message to the team!
                </h3>
              </Grid>
              <Grid xs={12} item>
                <Paper className={classes.paper}>
                  <TextField
                    inputProps={{
                      maxLength: 10,
                    }}
                    placeholder={"Enter your name (min 3)"}
                    required
                    theme={theme}
                    id="standard-basic"
                    label="Your name"
                    onChange={handleChangeFrom}
                  />
                </Paper>
              </Grid>
              <Grid xs={12} item>
                <Paper className={classes.paper}>
                  <TextField
                    required
                    inputProps={{
                      maxLength: 100,
                    }}
                    className={classes.msgBox}
                    placeholder={"Write a message (min 6 characters)"}
                    // helperText="Too short."
                    label="Message"
                    onChange={handleChangeMsg}
                    multiline
                    name="message"
                    rows={4}
                    variant="outlined"
                  />
                </Paper>
              </Grid>
              <Button
                disabled={able}
                variant="contained"
                color="secondary"
                onClick={() => {
                  console.log("modal closed ");
                  sendEmail();
                  close();
                }}
              >
                Send!
              </Button>
            </ThemeProvider>
          </Grid>
        </Paper>
      )}
    </Popup>
  );
};

export default ContactUs;
