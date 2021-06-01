import { useState, useEffect } from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';

const Settings = () => {
  let { path, url } = useRouteMatch();

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

  return (
    <>
      <Tabs value={0} centered>
        <Tab
          label="Classifications"
          component={Link}
          to={`${path}/classifications`}
        ></Tab>
        <Tab label="Modifiers" component={Link} to={`${path}/modifiers`}></Tab>
        <Tab
          label="Impacted Services"
          component={Link}
          to={`${path}/impacted-services`}
        ></Tab>
        <Tab
          label="Publishers"
          component={Link}
          to={`${path}/publishers`}
        ></Tab>
        <Tab label="E-mail Footer" component={Link} to={`${path}/footer`}></Tab>
      </Tabs>

      <Switch>
        <Redirect exact from="/settings" to="/settings/classifications" />
        <Container maxWidth="lg">
          <Route path={`${path}/classifications`}>
            <Box>
              {classifications.map((item) => {
                return (
                  <TextField
                    fullWidth
                    margin="normal"
                    defaultValue={item.description}
                    key={`classification-${item.id}`}
                  ></TextField>
                );
              })}
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
        </Container>
      </Switch>
    </>
  );
};

export default Settings;
