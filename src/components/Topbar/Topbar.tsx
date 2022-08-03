import styles from './Topbar.module.css';
import logo from '../../assets/todonelogo.png';
import {
  Avatar,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useSignOut, useUserData } from '@nhost/react';
import { TbPower } from 'react-icons/tb';
import { MdWavingHand } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const user = useUserData();
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={logo} alt="logo" />
        <Heading size="lg" className={styles.title}>
          ToDone
        </Heading>
      </div>
      <Menu>
        <MenuButton>
          <Avatar size="md" name={user?.displayName} />
        </MenuButton>
        <MenuList className={styles.menuList}>
          <Flex className={styles.menuHeader}>
            <MdWavingHand />
            <Text textAlign="center">Hi, {user?.displayName}!</Text>
          </Flex>
          <MenuDivider />
          <MenuItem icon={<TbPower />} onClick={signOutHandler}>
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
