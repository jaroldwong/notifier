import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const NavTabs = () => {
  return (
    <Tabs value={0} centered>
      <Tab label="Active"></Tab>
      <Tab label="Archived"></Tab>
      <Tab label="Settings"></Tab>
    </Tabs>
  );
};

export default NavTabs;
