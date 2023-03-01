import {
  faAngleRight,
  faArrowLeft,
  faFolder as faFolderSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import styles from './index.module.scss';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';

let moveToFolder_timer = 0;
let moveToFolder_delay = 200;
let moveToFolder_prevent = false;

const MoveToFolder = observer(({ current = 0 }) => {
  const [currentCollection, setCurrentCollection] = useState(0);
  const [selectCollection, setSelectCollection] = useState(null);
  const {
    damListViewModel: {
      collections = [],
      moveToFolder,
      actionState: { selectedCards },
    },
    damFormViewModel: { closeMoveToFolder },
  } = useDamViewModel();
  const { t } = useTranslation('common');

  const mapDataSelectCards = useMemo(
    () => selectedCards.map((selectedItem) => +selectedItem?.id) ?? [],
    [selectedCards]
  );

  const isNoCollection = useMemo(
    () => selectedCards.filter((selectedItem) => !selectedItem?.[DAM_ASSETS_FIELD_KEY.TYPE]) ?? [],
    [selectedCards]
  );
  useEffect(() => {
    if (current) {
      const currentItem = collections.find((collection) => +collection.id === +current);
      if (currentItem?.id) {
        setCurrentCollection(currentItem);
      }
    }
    return () => {};
  }, []);

  const goToFolder = (curretnId) => {
    if (curretnId) {
      setCurrentCollection(curretnId);
      setSelectCollection(curretnId);
    } else {
      const backCollection = collections.find(
        (collection) => +collection.id === currentCollection?.parent_id
      );
      if (backCollection) {
        setCurrentCollection(backCollection);
        setSelectCollection(backCollection);
      } else {
        setCurrentCollection(0);
        setSelectCollection(0);
      }
    }
  };

  const onSelect = (collection) => {
    setSelectCollection((prevState) => {
      if (prevState === collection?.id) {
        return null;
      }
      return collection;
    });
  };

  const moveTo = () => {
    if (selectCollection) {
      moveToFolder(null, selectCollection?.id);
    } else {
      moveToFolder(null, 0);
    }
    closeMoveToFolder();
  };

  return (
    <div className="bg-white border zindex-5 shadow-sm rounded-3">
      <div className={`w-100 border-0 border-bottom btn w-100 d-flex h-48px align-items-center `}>
        <FontAwesomeIcon
          onClick={() => goToFolder()}
          className={`text-gray-dark cursor-pointer px-2 ${
            !currentCollection ? 'pe-none opacity-0' : null
          }`}
          icon={faArrowLeft}
        />
        <span className="ps-3 m-0 text-gray-dark fw-semibold">{t('txt_move_to_folder')} </span>
      </div>
      <div className={`w-100 ${styles.list}`}>
        {collections.map((collection, index) => {
          if (+collection?.parent_id === (currentCollection.id ? +currentCollection.id : 0)) {
            return (
              collection?.name && (
                <OverlayTrigger
                  key={index}
                  placement={'bottom'}
                  overlay={
                    <Tooltip
                      id={`folder_${collection.id}`}
                      className={`zindex-5 text-white px-2 rounded-2 bg-gray-dark
                        ${mapDataSelectCards.includes(+collection?.id) ? '' : 'd-none'}
                        `}
                    >
                      {t('txt_can_not_move_to_itself')}
                    </Tooltip>
                  }
                >
                  <span className="d-block ">
                    <button
                      className={`text-body m-0 btn border-0 rounded-0 d-flex align-items-center cursor-pointer h-48px w-100 ${
                        styles.item
                      } ${
                        selectCollection?.id === collection?.id
                          ? `btn-success text-white fw-semibold ${styles.active}`
                          : 'btn-outline-light text-gray-dark'
                      } ${mapDataSelectCards.includes(+collection?.id) ? styles.disabled : ''}`}
                      disabled={mapDataSelectCards.includes(+collection?.id) ? true : false}
                      onDoubleClick={() => {
                        clearTimeout(moveToFolder_timer);
                        moveToFolder_prevent = true;
                        goToFolder(collection);
                      }}
                      onClick={() => {
                        moveToFolder_timer = setTimeout(function () {
                          if (!moveToFolder_prevent) {
                            onSelect(collection);
                          }
                          moveToFolder_prevent = false;
                        }, moveToFolder_delay);
                      }}
                    >
                      <>
                        {selectCollection?.id === collection?.id ? (
                          <FontAwesomeIcon className="text-white px-2" icon={faFolderSolid} />
                        ) : (
                          <FontAwesomeIcon className="text-gray-dark px-2" icon={faFolder} />
                        )}

                        <span className="ps-3">{collection.name}</span>
                        <FontAwesomeIcon
                          size={'lg'}
                          className={`px-2 ms-auto ${
                            selectCollection?.id === collection?.id ? `text-white` : 'text-green'
                          }`}
                          icon={faAngleRight}
                        />
                      </>
                    </button>
                  </span>
                </OverlayTrigger>
              )
            );
          }
        })}
      </div>
      <div className="d-flex border-top px-2 py-1 justify-content-end align-items-center border-bottom">
        <button className="m-0 btn py-2 btn-outline-secondary" onClick={closeMoveToFolder}>
          {t('txt_cancel')}
        </button>

        <OverlayTrigger
          placement={'bottom'}
          overlay={
            <Tooltip
              id={`moveToFolderButton`}
              className={`zindex-5 text-white px-2 rounded-2 bg-gray-dark ${
                (+currentCollection?.id !== +current && +selectCollection?.id !== +current) ||
                (+currentCollection?.id !== +selectCollection?.id &&
                  +selectCollection?.id &&
                  +selectCollection?.id !== +current) ||
                (+current !== 0 && selectCollection === 0) ||
                isNoCollection.length < 1
                  ? 'd-none'
                  : ''
              }`}
            >
              {t('txt_item_already_in_this_folder')}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <button
              disabled={
                (+currentCollection?.id !== +current && +selectCollection?.id !== +current) ||
                (+currentCollection?.id !== +selectCollection?.id &&
                  +selectCollection?.id &&
                  +selectCollection?.id !== +current) ||
                (+current !== 0 && selectCollection === 0) ||
                isNoCollection.length < 1
                  ? false
                  : true
              }
              className="ps-3 text-body m-0 py-2 btn btn-success ms-2 "
              onClick={moveTo}
            >
              {t('txt_move_to_folder')}
            </button>
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
});

export default MoveToFolder;
