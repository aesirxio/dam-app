/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const DamStore = React.createContext();

export const DamStoreProvider = ({ children, viewModel }) => {
  return <DamStore.Provider value={viewModel}>{children}</DamStore.Provider>;
};

/* Hook to use store in any functional component */
export const useDamViewModel = () => React.useContext(DamStore);

/* HOC to inject store to any functional or class component */
export const withDamViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useDamViewModel()} />;
};
