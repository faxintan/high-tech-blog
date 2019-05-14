import React from 'react';
import { navigate } from 'gatsby';
import { pick } from '@utils/index';
import { translate } from 'react-i18next';
import getLanguageList from '@context/i18next/list';

/*
 ** language context module
 **
 ** @props         -       t, i18n, lng
 ** @methods       -       getAll, getById, updateById
 */

const languageContext = React.createContext({});

class I18nextProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this._languages = getLanguageList(props.t);
  }

  getAll = () => {
    return this._languages.slice();
  };

  getById = id => {
    const { availableLngs } = this.props.pageContext;
    if (!availableLngs.includes(id)) return;
    return this._languages.filter(item => item.id === id)[0];
  };

  updateById = id => {
    const lng = this.getById(id);
    const { pageContext } = this.props;
    if (!lng) return;
    navigate(`/${lng.id}${pageContext.originalPath || '/'}`);
  };

  render() {
    const data = Object.assign(
      { lng: this.props.pageContext.lng },
      pick(this.props, ['t', 'i18n']),
      pick(this, ['getAll', 'getById', 'updateById'])
    );
    return (
      <languageContext.Provider value={data}>
        {this.props.children}
      </languageContext.Provider>
    );
  }
}

export default translate()(I18nextProvider);

export const withI18next = Component => props => {
  return (
    <languageContext.Consumer>
      {i18next => <Component {...props} i18next={i18next} />}
    </languageContext.Consumer>
  );
};
