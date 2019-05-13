import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, handleSelect } = this.props;
    if (!Array.isArray(data) || !data.length) return null;

    <List component="nav">
      {data.map(item => (
        <ListItem button key={item.id} onClick={() => handleSelect(item)}>
          <ListItemText>
            <Typography noWrap>{item.name}</Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>;
  }
}

export default DropDown;
