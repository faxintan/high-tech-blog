import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

class Sidebar extends React.Component {
  render() {
    const { visible, children, Header, classes } = this.props;

    return (
      <Slide in={visible} direction="right" mountOnEnter unmountOnExit>
        <Paper className={classes.root}>
          <Grid
            className={classes.container}
            container
            direction="column"
            wrap="nowrap"
          >
            {Header && <Grid className={classes.header}>{Header}</Grid>}

            <Grid className={classes.body}>{children}</Grid>
          </Grid>
        </Paper>
      </Slide>
    );
  }
}

const styles = theme => ({
  root: {
    height: '100%',
  },
  container: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: theme.spacing(30),
  },
  header: {
    flex: 'none',
  },
  body: {
    flex: 'auto',
    background: 'yellow',
  },
});

export default withStyles(styles)(Sidebar);
