import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageNotAvailable from "../ImageNotAvailable";
import SimplePlayerInfo from "../SimplePlayerInfo";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getPlayerStats, getPlayerPic } from "../../data";
import { useStyles } from "./style";

const keyStats = [
  ["min", "fgm", "fga", "fg3m", "fg3a", "ftm", "fta", "oreb", "dreb"],
  [
    "reb",
    "ast",
    "stl",
    "blk",
    "turnover",
    "pf",
    "pts",
    "fg_pct",
    "fg3_pct",
    "ft_pct",
  ],
];

const Player = React.memo(
  ({
    id,
    first_name,
    last_name,
    position,
    team,
    weight_pounds,
    height_feet,
  }) => {
    const classes = useStyles();
    const [stats, setStats] = React.useState();
    const [images, setImages] = React.useState();

    useEffect(() => {
      async function getStats() {
        const img = await getPlayerPic(last_name, first_name);
        setImages(img);
        const { data } = await getPlayerStats(id);
        if (data.length) {
          setStats(data[0]);
        }
      }
      getStats();
    }, [id, first_name, last_name]);

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <SimplePlayerInfo
                overrideClasses={classes.card}
                first_name={first_name}
                last_name={last_name}
                position={position}
                team={team}
              />
              <Card className={classes.root}>
                {images ? (
                  <CardMedia
                    className={classes.media}
                    image={images}
                    title={`${last_name} ${first_name}`}
                    alt={`${last_name} ${first_name}`}
                  />
                ) : (
                  <ImageNotAvailable />
                )}
              </Card>
              {weight_pounds && <p>Weight pounds: {weight_pounds}</p>}
              {height_feet && <p>Height feet: {height_feet}</p>}
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <CardContent>
                    <Typography color="textSecondary" component="div">
                      {stats ? (
                        <Grid item xs container direction="row" spacing={2}>
                          <Typography variant="h6" className={classes.title}>
                            <ListItemText
                              primary={`Season: ${stats["season"]}, Games: ${stats.games_played}`}
                            />
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <List dense={true}>
                                {keyStats[0].map((key) => (
                                  <ListItem key={key}>
                                    <ListItemText
                                      primary={key.toLocaleUpperCase()}
                                    />
                                    <ListItemText
                                      className={classes.value}
                                      primary={stats[key]}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <List dense={true}>
                                {keyStats[1].map((key) => (
                                  <ListItem key={key}>
                                    <ListItemText
                                      primary={key.toLocaleUpperCase()}
                                    />
                                    <ListItemText
                                      className={classes.value}
                                      primary={stats[key]}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : (
                        <p>No Stats</p>
                      )}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
);

export default Player;
