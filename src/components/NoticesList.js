import { Box, Table, Tabs } from 'react-bulma-components';

const NoticesList = () => {
  return (
    <>
      <Box>
        <Tabs size="medium">
          <Tabs.Tab active>Active</Tabs.Tab>
          <Tabs.Tab>Archived</Tabs.Tab>
        </Tabs>
        <Table size="fullwidth" striped>
          <thead>
            <tr>
              <th>Created</th>
              <th>Subject</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Yesterday</td>
              <td>Early Closure</td>
              <td>Bob</td>
              <td></td>
            </tr>
            <tr>
              <td>11 days ago</td>
              <td>phishing scams</td>
              <td>Bob</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </>
  );
};

export default NoticesList;
