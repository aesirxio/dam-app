import React from 'react';

const Dot = (props) => {
  return (
    <svg
      {...props}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      focusable="false"
      fill="currentColor"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
  );
};

export default Dot;
