import React from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { withThemeContext } from 'themes/ThemeContextProvider';

class SwitchThemes extends React.Component {
  render() {
    const { theme, listThemes, changeTheme } = this.props;
    return (
      <div className="theme-icon rounded-pill position-relative cursor-pointer border">
        <FontAwesomeIcon
          className="text-gray-900 align-bottom"
          icon={faPalette}
          width={16}
          height={16}
        />
        <div className="theme-icon-list position-absolute bottom-100 start-50 py-1 rounded-3 px-2 translate-middle-x d-flex flex-column-reverse shadow">
          {listThemes.map((item, index) => {
            return (
              <button
                key={index}
                title={item.theme + ' theme'}
                disabled={theme === item.theme}
                className={`bg-${
                  item.theme
                } box-color m-0 my-1 cursor-pointer btn p-0 opacity-100 ${
                  theme === item.theme && 'border-green'
                }`}
                onClick={() => changeTheme(item.theme)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default withThemeContext(SwitchThemes);
