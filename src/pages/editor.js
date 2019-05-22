import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import { withI18next } from 'gatsby-plugin-i18next';

import Layout from '@modules/common/layout';
import EditorMarkdown from '@components/editor/markdown';

class EditorPage extends React.PureComponent {
  render() {
    const { t } = this.props;
    return (
      <>
        <Helmet>
          <title>{t('Hi-Tech Blog')}</title>
        </Helmet>
        <Layout {...this.props}>
          <EditorMarkdown />
        </Layout>
      </>
    );
  }
}

export default withI18next()(translate()(EditorPage));

export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng } }) {
      ...TranslationFragment
    }
  }
`;
