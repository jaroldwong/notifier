import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NoticesList from '../components/NoticesList';

const Notices = () => {
  return (
    <>
      <Tabs value={0} centered>
        <Tab label="Active"></Tab>
        <Tab label="Archived"></Tab>
      </Tabs>
      <NoticesList />
    </>
  );
};

export default Notices;
