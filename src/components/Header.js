import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Notifier</Typography>
        <Button color="inherit">Compose</Button>
        <div className={classes.grow}></div>
        <Button color="inherit">Log out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
