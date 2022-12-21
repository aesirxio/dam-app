import React from 'react';
// import PropTypes from 'prop-types';

const ThumbsDragPreview = ({ thumbs }) => {
  return (
    <div>
      {thumbs.slice(0, 3).map((card, i) => (
        <div
          key={card.id}
          className="card card-dragged"
          style={{
            zIndex: thumbs.length - i,
            transform: `rotateZ(${-i * 2.5}deg)`,
          }}
        >
          {card.id}
        </div>
      ))}
    </div>
  );
};

ThumbsDragPreview.propTypes = {
  // thumbs: PropTypes.array,
};

export default ThumbsDragPreview;
