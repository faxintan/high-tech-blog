import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import { withI18next } from 'gatsby-plugin-i18next';

import Layout from '@modules/common/layout';

class IndexPage extends React.PureComponent {
  render() {
    const { t } = this.props;
    return (
      <>
        <Helmet>
          <title>{t('Hi-Tech Blog')}</title>
        </Helmet>
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
            <div style={{ fontSize: '24px' }}>{t('Hello Gatsby')}</div>
          </div>
        </Layout>
      </>
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
