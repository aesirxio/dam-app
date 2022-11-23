/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const ThemesContext = React.createContext();

const listThemes = [
  { theme: 'light', color: '#fff', className: '' },
  { theme: 'dark', color: '#000', className: 'border-green' },
];

export class ThemesContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.getCurrentTheme(),
    };
  }

  getCurrentTheme = () => {
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      localStorage.setItem('theme', 'light');
      return currentTheme ?? 'light';
    }
    return currentTheme;
  };

  changeTheme = (newTheme) => {
    this.setState({ theme: newTheme });
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('class', newTheme);
  };

  componentDidMount() {
    document.documentElement.setAttribute('class', this.state.theme);
  }

  render() {
    return (
      <ThemesContext.Provider
        value={{ theme: this.state.theme, listThemes, changeTheme: this.changeTheme }}
      >
        {this.props.children}
      </ThemesContext.Provider>
    );
  }
}

/* Hook to use store in any functional component */
export const useThemeContext = () => React.useContext(ThemesContext);

/* HOC to inject store to any functional or class component */
export const withThemeContext = (Component) => (props) => {
  return <Component {...props} {...useThemeContext()} />;
};
