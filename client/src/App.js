import React, { Component, useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import PlayerMain from "./components/PlayerMain/PlayerMain";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import RainbowText from "react-rainbow-text";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { readRemoteFile } from "react-papaparse";
import ContactUs from "./components/ContactUs/ContactUs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SHEETS_URL } from "./secret.js";

class App extends Component {
  constructor() {
    super();
    this.state = { data: [], sheetData: [] };
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:9000/`);
    const json = await response.json();
    let results2 = {};

    await new Promise(function (resolve, reject) {
      readRemoteFile(SHEETS_URL, {
        header: true,
        complete: (results) => {
          console.log("Results:", results);
          results2 = results;
          resolve(true);
        },
      });
    });
    this.setState({ data: json, sheetData: results2 });
  }

  render() {
    const data = this.state.data;
    const sheetData = this.state.sheetData;
    console.log(this.state);
    console.log(data);
    console.log(sheetData);
    if (data.length < 1 || sheetData.length < 1) {
      return (
        <div className="Loading">
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            align="center"
          >
            <Grid item>
              <CircularProgress size={100} color="secondary" />
            </Grid>
            <Grid item>
              <h1>LOADING</h1>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar className="Toolbar">
            <h1>
              Kõvade Meeste{" "}
              <RainbowText lightness={0.5} saturation={1}>
                Rainbow
              </RainbowText>{" "}
              Klubi
            </h1>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item> </Grid>
          {data["Gamers:"]
            .sort(function (a, b) {
              return b["level"] - a["level"];
            })
            .map((d) => (
              <Grid key={d["ign"].toString()} item>
                <PlayerMain
                  {...d}
                  {...sheetData["data"].find(
                    (o) => o["tracker"] === d["trackerurl"]
                  )}
                ></PlayerMain>
              </Grid>
            ))}
          <Grid item> </Grid>
        </Grid>
        <ContactUs></ContactUs>
      </div>
    );
  }
}

export default App;
