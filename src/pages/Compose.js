import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Compose = () => {
  const classes = useStyles();

  const [impactedServices, setImpactedServices] = useState({
    fileServices: false,
    printServices: false,
    vpnServices: false,
  });

  const [publishers, setPublishers] = useState({
    mailer: true,
    rss: true,
  });

  const handleImpactedServicesChange = (event) => {
    setImpactedServices((prevState) => {
      return { ...prevState, [event.target.name]: event.target.checked };
    });
  };

  const handlePublishersChange = (event) => {
    setPublishers((prevState) => {
      return { ...prevState, [event.target.name]: event.target.checked };
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={10} spacing={2}>
        <form>
          <TextField label="Recipients" fullWidth></TextField>
          <TextField label="Subject" fullWidth required></TextField>
          <TextField
            label="Impact Statement"
            fullWidth
            multiline
            required
          ></TextField>
          <TextField label="Purpose" fullWidth multiline rows="4"></TextField>
          <TextField
            label="Resolution"
            fullWidth
            multiline
            rows="4"
          ></TextField>
          <TextField
            label="Workaround"
            fullWidth
            multiline
            rows="4"
          ></TextField>
          <TextField
            label="Other Services"
            fullWidth
            multiline
            rows="4"
          ></TextField>
        </form>
      </Grid>
      <Grid item xs={2} spacing={2}>
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Window Start"
            type="datetime-local"
            defaultValue="2021-06-01T08:00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Window Start"
            type="datetime-local"
            defaultValue="2021-06-01T08:00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <FormControl component="fieldset">
          <FormLabel component="legend">Classifications</FormLabel>
          <RadioGroup
            aria-label="classifications"
            name="classifications"
            value="asdf"
          >
            <FormControlLabel
              value=""
              control={<Radio />}
              label="Service Degradation"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Modifiers</FormLabel>
          <RadioGroup
            aria-label="classifications"
            name="classifications"
            value="asdf"
          >
            <FormControlLabel value="" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Impacted Services</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={impactedServices.fileServices}
                  onChange={handleImpactedServicesChange}
                  name="fileServices"
                />
              }
              label="File Services"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={impactedServices.printServices}
                  onChange={handleImpactedServicesChange}
                  name="printServices"
                />
              }
              label="Print Services"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={impactedServices.vpnServices}
                  onChange={handleImpactedServicesChange}
                  name="vpnServices"
                />
              }
              label="VPN Services"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Publisher</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={publishers.mailer}
                  onChange={handlePublishersChange}
                  name="mailer"
                />
              }
              label="Mailer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={publishers.rss}
                  onChange={handlePublishersChange}
                  name="rss"
                />
              }
              label="RSS Feed"
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Compose;
