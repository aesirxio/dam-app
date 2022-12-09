/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, isShadow = true) => {
  return {
    control: (provided) => {
      return {
        ...provided,
        minHeight: 50,
        boxShadow: isShadow ? '0 3px 5px rgb(0 0 0 / 5%)' : 'none',
        borderColor: isBorder ? 'var(--bs-gray-select)' : 'transparent',
        '&:hover': {
          borderColor: isBorder ? 'var(--bs-success)' : 'transparent',
        },

        backgroundColor: 'var(--bs-white)',
        cursor: 'pointer',
        borderRadius: 0,
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
        borderRight: '1px solid var(--bs-gray-select)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(--bs-gray-select)',
        backgroundColor: 'var(--dropdown-bg)',
        width: 'max-content',
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--dropdown-item-hover-color)' : 'var(--dropdown-item-color)',
        backgroundColor: state.isSelected ? 'var(--dropdown-item-hover-bg)' : 'var(--dropdown-bg)',
        '&:hover': {
          color: 'var(--dropdown-item-hover-color)',
          backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
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
      color: 'var(--bs-body-color)',
      fontWeight: 600,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'var(--bs-body-color)',
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
      color: 'var(--bs-body-color)',
    }),
  };
};

export default customStyles;
