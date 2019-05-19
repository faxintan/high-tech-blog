import React from 'react';
import { translate } from 'react-i18next';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import SideBar from '@components/common/sidebar';
import UserCard from '@modules/common/user_card';

class Menu extends React.Component {
  render() {
    const { visible, t } = this.props;

    return (
      <SideBar visible={visible} Header={<UserCard />}>
        <MenuList>
          {[t('One'), t('Two'), t('Three'), t('Four'), t('Five')].map(m => {
            return (
              <MenuItem key={m}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <Typography variant="body1" noWrap>
                  {`${t('Menu')} ${m}`}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </SideBar>
    );
  }
}

export default translate()(Menu);
