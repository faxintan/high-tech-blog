import React from 'react';
import { graphql } from 'gatsby';
import { translate } from 'react-i18next';
import { withI18next } from 'gatsby-plugin-i18next';

import Layout from '@modules/common/layout';

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

export default withI18next()(translate()(IndexPage));

export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng } }) {
      ...TranslationFragment
    }
  }
`;
