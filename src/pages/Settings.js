import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const Settings = () => {
  return (
    <>
      <Tabs value={0} centered>
        <Tab label="Classifications"></Tab>
        <Tab label="Modifiers"></Tab>
        <Tab label="Impacted Services"></Tab>
        <Tab label="Publishers"></Tab>
        <Tab label="E-mail Footer"></Tab>
      </Tabs>
    </>
  );
};

export default Settings;
