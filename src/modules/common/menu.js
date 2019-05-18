import React from 'react';
import Grid from '@material-ui/core/Grid';
import SideBar from '@components/common/sidebar';
import UserCard from '@modules/common/user_card';

class Menu extends React.Component {
  render() {
    const { visible } = this.props;

    return (
      <SideBar visible={visible} Header={<UserCard />}>
        <Grid container>Test</Grid>
      </SideBar>
    );
  }
}

export default Menu;
