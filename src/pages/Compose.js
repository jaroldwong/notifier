import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { apiService } from '../services/apiService';
import { capitalize } from '../utils';

import Button from '@material-ui/core/Button';
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

  let history = useHistory();

  const [formFields, setFormFields] = useState({
    subject: '',
    impactStatement: '',
    purpose: '',
    resolution: '',
    workaround: '',
    otherServices: '',
    classification: '',
    modifier: '',
    startDate: '',
    endDate: '',
  });

  const [classifications, setClassifications] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [impactedServices, setImpactedServices] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const classificationsProm = apiService.get('/classifications');
      const modifiersProm = apiService.get('/modifiers');
      const impactedServicesProm = apiService.get('/impacted_services');
      const publishersProm = apiService.get('/publishers');

      const [classifications, modifiers, impactedServices, publishers] =
        await Promise.all([
          classificationsProm,
          modifiersProm,
          impactedServicesProm,
          publishersProm,
        ]);

      const classificationOptions = classifications.map((c) => {
        return {
          ...c,
          description: capitalize(
            c.description.slice(0, c.description.indexOf(':'))
          ),
        };
      });

      const modifierOptions = modifiers.map((m) => ({
        ...m,
        description: capitalize(
          m.description.slice(0, m.description.indexOf(':'))
        ),
      }));

      const impactedServiceOptions = impactedServices.map((i) => ({
        ...i,
        selected: false,
      }));
      const publisherOptions = publishers.map((i) => ({
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
      return prevState.map((i) =>
        i.description === event.target.name
          ? { ...i, selected: event.target.checked }
          : i
      );
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

  const handleFormFieldInput = (event) => {
    debugger;
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSend = async (event) => {
    event.preventDefault();

    const message = {
      ...formFields,
      impactedServices: impactedServices.filter((i) => i.selected === true),
      publishers: publishers.filter((p) => p.selected === true),
      sender: 'loginId',
      isActive: true,
      createdAt: Date.now(), // doing it here to avoid custom json-server setup
    };

    const response = await apiService.post('/messages', message);

    if (response.status === 201) {
      history.push('/');
    }
  };

  return (
    <Container m="2">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <form noValidate autoComplete="off" onSubmit={handleSend}>
            <TextField className={classes.field} label="Recipients" fullWidth />
            <TextField
              className={classes.field}
              label="Subject"
              fullWidth
              required
              name="subject"
              value={formFields.subject}
              onChange={handleFormFieldInput}
            />
            <TextField
              className={classes.field}
              label="Impact Statement"
              fullWidth
              multiline
              required
              name="impactStatement"
              value={formFields.impactStatement}
              onChange={handleFormFieldInput}
            />
            <TextField
              className={classes.field}
              label="Purpose"
              fullWidth
              multiline
              rows="4"
              name="purpose"
              value={formFields.purpose}
              onChange={handleFormFieldInput}
            />
            <TextField
              className={classes.field}
              label="Resolution"
              fullWidth
              multiline
              rows="4"
              name="resolution"
              value={formFields.resolution}
              onChange={handleFormFieldInput}
            />
            <TextField
              className={classes.field}
              label="Workaround"
              fullWidth
              multiline
              rows="4"
              name="workaround"
              value={formFields.workaround}
              onChange={handleFormFieldInput}
            />
            <TextField
              className={classes.field}
              label="Other Services"
              fullWidth
              multiline
              rows="4"
              name="otherServices"
              value={formFields.otherServices}
              onChange={handleFormFieldInput}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid className={classes.options} item md={4}>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local-start"
              label="Window Start"
              type="datetime-local"
              defaultValue="2021-06-01T08:00"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="startDate"
              onChange={handleFormFieldInput}
            />
          </form>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local-end"
              label="Window Start"
              type="datetime-local"
              defaultValue="2021-06-01T08:00"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="endDate"
              onChange={handleFormFieldInput}
            />
          </form>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Classifications</FormLabel>
            <RadioGroup
              aria-label="classifications"
              name="classification"
              value={formFields.classification}
              onChange={handleFormFieldInput}
            >
              {classifications.map((c) => (
                <FormControlLabel
                  key={`classification-${c.id}`}
                  value={c.description}
                  control={<Radio />}
                  label={c.description}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Modifiers</FormLabel>
            <RadioGroup
              aria-label="modifiers"
              name="modifier"
              value={formFields.modifier}
              onChange={handleFormFieldInput}
            >
              {modifiers.map((m) => (
                <FormControlLabel
                  key={`modifier-${m.id}`}
                  value={m.description}
                  control={<Radio />}
                  label={m.description}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Impacted Services</FormLabel>
            <FormGroup>
              {impactedServices.map((i) => (
                <FormControlLabel
                  key={`impacted-service-${i.id}`}
                  label={i.description}
                  control={
                    <Checkbox
                      checked={i.selected}
                      onChange={handleImpactedServicesChange}
                      name={i.description}
                    />
                  }
                />
              ))}
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
