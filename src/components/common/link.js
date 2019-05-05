import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'gatsby-plugin-i18next';

function Link(props) {
  return <MuiLink component={Link} {...props} />;
}

export default Link;
