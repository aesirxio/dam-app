/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, isShadow = true, isBackGround = false) => {
  return {
    control: (provided) => {
      return {
        ...provided,
        minHeight: 50,
        boxShadow: isShadow ? '0 3px 5px rgb(0 0 0 / 5%)' : 'none',
        borderColor: isBorder ? 'var(--bs-select-border)' : 'transparent',
        '&:hover': {
          borderColor: isBorder ? 'var(--bs-success)' : 'transparent',
        },
        backgroundColor: isBackGround ? 'var(--bs-select-control-background)' : 'transparent',
        cursor: 'pointer',
        borderRadius: 5,
        width: 'auto',
      };
    },

    menu: (styles) => {
      return {
        ...styles,
        top: 'calc(100% - 2px)',
        margin: 0,
        border: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRight: '1px solid var(--bs-select-border)',
        backgroundColor: 'var(--bs-select-control-background)',
        width: '100%',
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--bs-success)' : 'var(--bs-select-color)',
        backgroundColor: 'transparent',

        '&:hover': {
          color: 'var(--bs-success)',
        },
        fontWeight: state.isSelected ? 600 : 400,
        cursor: 'pointer',
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),

    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--bs-success)',
      '&:hover': {
        color: 'var(--bs-success)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--bs-select-color)',
      fontWeight: 600,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'var(--bs-select-color)',
        fontWeight: 600,
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--view-active-bg)',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--bs-select-color)',
    }),
  };
};

export default customStyles;
