import React from 'react';
import { translate } from 'react-i18next';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import Link from '@components/common/link';
import SideBar from '@components/common/sidebar';
import UserCard from '@modules/common/user_card';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.menus = [
      {
        link: '/',
        name: t('Home'),
      },
      {
        link: '/editor',
        name: t('New Blog'),
      },
      {
        link: '/',
        name: t('Waiting...'),
      },
      {
        link: '/',
        name: t('Waiting...'),
      },
      {
        link: '/',
        name: t('Waiting...'),
      },
      {
        link: '/',
        name: t('Waiting...'),
      },
    ];
  }

  render() {
    const { visible, t } = this.props;

    return (
      <SideBar visible={visible} Header={<UserCard />}>
        <MenuList>
          {this.menus.map((menu, index) => {
            return (
              <MenuItem key={index}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <Link to={menu.link}>
                  <Typography variant="body1" noWrap>
                    {menu.name}
                  </Typography>
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </SideBar>
    );
  }
}

export default translate()(Menu);
