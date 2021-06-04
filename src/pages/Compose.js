import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

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
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
}));

const Compose = () => {
  const classes = useStyles();

  const [formClassification, setFormClassification] = useState('');
  const [formModifier, setFormModifier] = useState('');
  const [formServices, setFormServices] = useState([]);

  const [classifications, setClassifications] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [impactedServices, setImpactedServices] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const classifications = await fetch('/classifications');
      const modifiers = await fetch('/modifiers');
      const impactedServices = await fetch('/impacted_services');
      const publishers = await fetch('/publishers');

      const classificationsJSON = await classifications.json();
      const modifiersJSON = await modifiers.json();
      const impactedServicesJSON = await impactedServices.json();
      const publishersJSON = await publishers.json();

      const classificationOptions = await classificationsJSON.map((i) => ({
        ...i,
        selected: false,
      }));
      const modifierOptions = await modifiersJSON.map((i) => ({
        ...i,
        selected: false,
      }));
      const impactedServiceOptions = await impactedServicesJSON.map((i) => ({
        ...i,
        selected: false,
      }));
      const publisherOptions = await publishersJSON.map((i) => ({
        ...i,
        selected: false,
      }));

      setClassifications(classificationOptions);
      setModifiers(modifierOptions);
      setImpactedServices(impactedServiceOptions);
      setPublishers(publisherOptions);
    };

    fetchSettings();
  }, []);

  const handleImpactedServicesChange = (event) => {
    setImpactedServices((prevState) => {
      return { ...prevState, [event.target.name]: event.target.checked };
    });
  };

  const handlePublishersChange = (event) => {
    setPublishers((prevState) => {
      return prevState.map((i) =>
        i.description === event.target.name
          ? { ...i, selected: event.target.checked }
          : i
      );
    });
  };

  return (
    <Container m="2">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <form noValidate autoComplete="off">
            <TextField className={classes.field} label="Recipients" fullWidth />
            <TextField
              className={classes.field}
              label="Subject"
              fullWidth
              required
            />
            <TextField
              className={classes.field}
              label="Impact Statement"
              fullWidth
              multiline
              required
            />
            <TextField
              className={classes.field}
              label="Purpose"
              fullWidth
              multiline
              rows="4"
            />
            <TextField
              className={classes.field}
              label="Resolution"
              fullWidth
              multiline
              rows="4"
            />
            <TextField
              className={classes.field}
              label="Workaround"
              fullWidth
              multiline
              rows="4"
            />
            <TextField
              className={classes.field}
              label="Other Services"
              fullWidth
              multiline
              rows="4"
            />
          </form>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            startIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Grid>
        <Grid className={classes.options} item md={4}>
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
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Classifications</FormLabel>
            <RadioGroup
              aria-label="classifications"
              name="classifications"
              value={formClassification}
              onChange={(e) => setFormClassification(e.target.value)}
            >
              <FormControlLabel
                value="degradation"
                control={<Radio />}
                label="Service Degradation"
              />
              <FormControlLabel
                value="outage"
                control={<Radio />}
                label="Service Outage"
              />
              <FormControlLabel
                value="maintenance"
                control={<Radio />}
                label="Planned Maintenance"
              />
              <FormControlLabel
                value="emergency"
                control={<Radio />}
                label="Emergency Maintenance"
              />
              <FormControlLabel
                value="closure"
                control={<Radio />}
                label="Closure"
              />
              <FormControlLabel
                value="security"
                control={<Radio />}
                label="Security Notice"
              />
              <FormControlLabel
                value="service"
                control={<Radio />}
                label="Service Notice"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Modifiers</FormLabel>
            <RadioGroup
              aria-label="modifiers"
              name="modifiers"
              value={formModifier}
              onChange={(e) => {
                setFormModifier(e.target.value);
              }}
            >
              <FormControlLabel
                value="update"
                control={<Radio />}
                label="UPDATE"
              />
              <FormControlLabel
                value="resolved"
                control={<Radio />}
                label="RESOLVED"
              />
              <FormControlLabel
                value="canceled"
                control={<Radio />}
                label="CANCELED"
              />
              <FormControlLabel
                value="reminder"
                control={<Radio />}
                label="REMINDER"
              />
              <FormControlLabel
                value="headsup"
                control={<Radio />}
                label="HEADS-UP"
              />
              <FormControlLabel
                value="rescheduled"
                control={<Radio />}
                label="RE-SCHEDULED"
              />
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
              {publishers.map((p) => (
                <FormControlLabel
                  key={`publisher-${p.id}`}
                  control={
                    <Checkbox
                      checked={p.selected}
                      onChange={handlePublishersChange}
                      name={p.description}
                    />
                  }
                  label={p.description}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Compose;
