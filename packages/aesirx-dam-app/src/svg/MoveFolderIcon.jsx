import React from 'react';

const MoveFolder = ({ fill = 'none', ...props }) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 19V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H13.236C12.8645 6.99999 12.5004 6.89651 12.1844 6.70116C11.8684 6.50581 11.6131 6.22631 11.447 5.894L10.553 4.106C10.3869 3.77353 10.1314 3.49394 9.8152 3.29858C9.49902 3.10322 9.13466 2.99983 8.763 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19Z"
        stroke="#282831"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13.5L8 13.5M16 13.5L13.3333 16M16 13.5L13.3333 11"
        stroke="#222328"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoveFolder;