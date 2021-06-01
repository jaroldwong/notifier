import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/compose" color="inherit">
          Compose
        </Button>
        <div className={classes.grow}></div>
        <Button component={Link} to="/settings" color="inherit">
          Settings
        </Button>
        <Button color="inherit">Log out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
