import React from 'react';
import { observer } from 'mobx-react';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import ComponentImage from 'components/ComponentImage';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';
import styles from './index.module.scss';
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
              zIndex: selectedCards.length - i,
              transform: `rotateZ(${-i * 2.5}deg)`,
            }}
          >
            <ComponentImage
              alt={card.name}
              src={
                card?.[DAM_ASSETS_FIELD_KEY.TYPE]
                  ? card?.[DAM_ASSETS_FIELD_KEY.DOWNLOAD_URL]
                  : '/assets/images/folder.svg'
              }
              wrapperClassName={styles.image_thumb}
            />
            <span> {card.name}</span>
          </div>
        ))
      ) : (
        <div className="card card-dragged">{thumbs.id}</div>
      )}
    </div>
  );
});

export default ThumbsDragPreview;
