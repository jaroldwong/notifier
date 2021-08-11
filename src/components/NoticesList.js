import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { capitalize } from '../utils';
import { apiService } from '../services/apiService';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const NoticesList = () => {
  const classes = useStyles();

  const MS_IN_DAY = 86400000;
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [modifiers, setModifiers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const messagesProm = apiService.get('/messages');
      const modifiersProm = apiService.get('/modifiers');

      await Promise.all([messagesProm, modifiersProm]).then((results) => {
        const [messages, modifiers] = results;
        setMessages(messages);
        setModifiers(modifiers);

        setIsLoading(false);
      });
    };
    fetchData();
  }, []);

  const handleModifier = () => {};
  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin="40px"
        >
          <CircularProgress />
        </Box>
      ) : (
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
                    <TableCell style={{ width: 433 }}>
                      {modifiers.map((m) => (
                        <Chip
                          className={classes.chip}
                          label={capitalize(
                            m.description.substring(
                              0,
                              m.description.indexOf(':')
                            )
                          )}
                          variant="outlined"
                        />
                      ))}
                      <Chip
                        className={classes.chip}
                        label="Archive"
                        variant="outlined"
                        onClick={handleModifier}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default NoticesList;
