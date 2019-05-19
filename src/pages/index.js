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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexFlow: 'column nowrap',
            height: '100%',
          }}
        >
          <div style={{ textAlign: 'center' }}>{t('Hello Gatsby')}</div>
          <div style={{ textAlign: 'center' }}>{t('confirm')}</div>
        </div>
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
