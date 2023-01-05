import React from 'react';
import { observer } from 'mobx-react';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';

const ThumbsDragPreview = observer(({ thumbs }) => {
  const {
    damListViewModel: {
      actionState: { selectedCards },
    },
  } = useDamViewModel();
  return (
    <div>
      {selectedCards.length ? (
        selectedCards.slice(0, 3).map((card, i) => (
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
        ))
      ) : (
        <div className="card card-dragged">{thumbs.id}</div>
      )}
    </div>
  );
});

export default ThumbsDragPreview;
