import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const data = [
  { created: 'Yesterday', subject: 'early closure', author: 'jay' },
  { created: '11 days ago', subject: 'phishing scam', author: 'bob' },
];

const NoticesList = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Created</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={`${d.created}-${d.subject}`}>
              <TableCell>{d.created}</TableCell>
              <TableCell>{d.subject}</TableCell>
              <TableCell>{d.author}</TableCell>
              <TableCell>Actions go here</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NoticesList;
