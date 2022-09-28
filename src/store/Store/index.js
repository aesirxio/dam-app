/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const GlobalStore = React.createContext();

export const GlobalStoreProvider = ({ children, viewModel }) => {
  return <GlobalStore.Provider value={viewModel}>{children}</GlobalStore.Provider>;
};

/* Hook to use store in any functional component */
export const useGlobalViewModel = () => React.useContext(GlobalStore);

/* HOC to inject store to any functional or class component */
export const withGlobalViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useGlobalViewModel()} />;
};
