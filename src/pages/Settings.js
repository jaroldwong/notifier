import { useState, useEffect } from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import { string_to_slug } from '../utils';

import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const useStyles = makeStyles({
  inputGroup: {
    display: 'flex',
    alignContent: 'center',
    margin: '16px',
  },
});

const Settings = () => {
  const classes = useStyles();

  let { path } = useRouteMatch();
  const { pathname } = useLocation();
  const param = pathname.split('/').pop();

  const tabValues = [
    'Classifications',
    'Modifiers',
    'Impacted Services',
    'Publishers',
    'E-Mail Footer',
  ];

  const [currentTab, setCurrentTab] = useState(() => {
    return tabValues.findIndex((t) => string_to_slug(t) === param);
  });
  const [classificationInput, setClassificationInput] = useState('');
  const [modifierInput, setModifierInput] = useState('');
  const [impactedServiceInput, setImpactedServiceInput] = useState('');

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
      setClassifications(await classifications.json());
      setModifiers(await modifiers.json());
      setImpactedServices(await impactedServices.json());
      setPublishers(await publishers.json());
    };

    fetchSettings();
  }, []);

  const handleClassificationInput = (event) => {
    setClassificationInput(event.target.value);
  };

  const handleAddClassification = async (event) => {
    event.preventDefault();
    const response = await fetch('/classifications/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: classificationInput }),
    });

    const newClassification = await response.json();

    setClassifications([...classifications, newClassification]);
    setClassificationInput('');
  };

  const handleDeleteClassification = (id) => {
    fetch(`/classifications/${id}`, {
      method: 'DELETE',
    });

    setClassifications(classifications.filter((c) => c.id !== id));
  };

  const handleModifierInput = (event) => {
    setModifierInput(event.target.value);
  };

  const handleAddModifier = async (event) => {
    event.preventDefault();
    const response = await fetch('/modifiers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: modifierInput }),
    });

    const newModifier = await response.json();

    setModifiers([...modifiers, newModifier]);
    setModifierInput('');
  };

  const handleImpactedServiceInput = (event) => {
    setImpactedServiceInput(event.target.value);
  };

  const handleAddImpactedService = async (event) => {
    event.preventDefault();

    const response = await fetch('/impacted_services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: impactedServiceInput }),
    });
    const newImpactedService = await response.json();

    setImpactedServices([...impactedServices, newImpactedService]);
    setImpactedServiceInput('');
  };

  const handleTabUpdate = (nextTab) => {
    const tabValue = tabValues.findIndex((tab) => {
      return tab === nextTab;
    });
    setCurrentTab(tabValue);
  };

  return (
    <>
      <Tabs value={currentTab} centered>
        {tabValues.map((tab, i) => (
          <Tab
            key={`settings-tab-${i}`}
            label={tab}
            component={Link}
            to={`${path}/${string_to_slug(tab)}`}
            onClick={() => handleTabUpdate(tab)}
          ></Tab>
        ))}
      </Tabs>

      <Container maxWidth="lg">
        <Switch>
          <Redirect exact from="/settings" to="/settings/classifications" />
          <Route path={`${path}/classifications`}>
            <Box>
              {classifications.map((item) => {
                return (
                  <div
                    key={`classification-${item.id}`}
                    className={classes.inputGroup}
                  >
                    <TextField
                      fullWidth
                      defaultValue={item.description}
                    ></TextField>
                    <DeleteForeverOutlinedIcon
                      onClick={() => handleDeleteClassification(item.id)}
                    ></DeleteForeverOutlinedIcon>
                  </div>
                );
              })}
              <form
                noValidate
                className={classes.inputGroup}
                onSubmit={handleAddClassification}
              >
                <TextField
                  fullWidth
                  placeholder="Add new classification"
                  value={classificationInput}
                  onChange={handleClassificationInput}
                ></TextField>
                <AddIcon />
              </form>
            </Box>
          </Route>
          <Route exact path={`${path}/modifiers`}>
            <Box>
              {modifiers.map((item) => {
                return (
                  <TextField
                    fullWidth
                    margin="normal"
                    defaultValue={item.description}
                    key={`modifier-${item.id}`}
                  ></TextField>
                );
              })}
              <form onSubmit={handleAddModifier}>
                <TextField
                  fullWidth
                  value={modifierInput}
                  onChange={handleModifierInput}
                />
              </form>
            </Box>
          </Route>
          <Route exact path={`${path}/impacted-services`}>
            <Box>
              {impactedServices.map((item) => {
                return (
                  <TextField
                    fullWidth
                    margin="normal"
                    defaultValue={item.description}
                    key={`impactedService-${item.id}`}
                  ></TextField>
                );
              })}
              <form onSubmit={handleAddImpactedService}>
                <TextField
                  fullWidth
                  value={impactedServiceInput}
                  onChange={handleImpactedServiceInput}
                />
              </form>
            </Box>
          </Route>
          <Route exact path={`${path}/publishers`}>
            <Box>
              {publishers.map((item) => {
                return (
                  <TextField
                    fullWidth
                    margin="normal"
                    defaultValue={item.description}
                    key={`publisher-${item.id}`}
                  ></TextField>
                );
              })}
            </Box>
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default Settings;
