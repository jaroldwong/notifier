import { Heading, Navbar } from 'react-bulma-components';

const Header = () => {
  return (
    <Navbar color="light">
      <Navbar.Brand>
        <Navbar.Item>
          <Heading size="2">Notifier</Heading>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container align="left">
          <Navbar.Item>Compose</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container align="right">
          <Navbar.Item>Settings</Navbar.Item>
          <Navbar.Item>Log out</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
