import React from 'react';
import { translate } from 'react-i18next';
import { withI18next } from 'gatsby-plugin-i18next';
import { withStyles } from '@material-ui/styles';

import Layout from '../components/common/layout';

const styles = {
  root: {
    width: '100%',
    height: '80px',
  },
};

class IndexPage extends React.PureComponent {
  render() {
    const { t } = this.props;
    return (
      <Layout {...this.props}>
        <div>{t('Hello Gatsby')}</div>
        <div>{t('confirm')}</div>
      </Layout>
    );
  }
}

export default withI18next()(translate()(withStyles(styles)(IndexPage)));

export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng } }) {
      ...TranslationFragment
    }
  }
`;
