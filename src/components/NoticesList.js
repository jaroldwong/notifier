import { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const NoticesList = () => {
  const MS_IN_DAY = 86400000;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await fetch('/messages').then((response) => response.json());
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <Container>
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
            {messages.map((d) => (
              <TableRow key={`${d.created}-${d.subject}`}>
                <TableCell>
                  {new Intl.RelativeTimeFormat('en', {
                    numeric: 'auto',
                  }).format(
                    Math.round((d.createdAt - Date.now()) / MS_IN_DAY),
                    'day'
                  )}
                </TableCell>
                <TableCell>{d.subject}</TableCell>
                <TableCell>{d.author}</TableCell>
                <TableCell>Actions go here</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default NoticesList;
