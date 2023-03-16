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
        borderColor: isBorder ? 'var(--select-border-dam)' : 'transparent',
        '&:hover': {
          borderColor: isBorder ? 'var(--bs-success)' : 'transparent',
        },
        backgroundColor: isBackGround ? 'var(--dropdown-bg-dam)' : 'transparent',
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        border: '1px solid var(--select-border-dam)',
        backgroundColor: 'var(--dropdown-bg-dam)',
        width: '100%',
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--bs-success)' : 'var(--dropdown-item-color-dam)',
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
      color: 'var(--dropdown-item-color-dam)',
      fontWeight: 600,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'var(--dropdown-item-color-dam)',
        fontWeight: 600,
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--view-active-bg-dam)',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--dropdown-item-color-dam)',
    }),
  };
};

export default customStyles;
