import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'gatsby-plugin-i18next';

export default props => {
  return <MuiLink component={Link} {...props} underline="none" />;
};
