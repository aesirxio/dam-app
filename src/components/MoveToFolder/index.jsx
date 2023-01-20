import { faArrowLeft, faArrowRight, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import styles from './index.module.scss';

let moveToFolder_timer = 0;
let moveToFolder_delay = 200;
let moveToFolder_prevent = false;

const MoveToFolder = observer(({ current = 0 }) => {
  const [currentCollection, setCurrentCollection] = useState(current);
  const [selectCollection, setSelectCollection] = useState(null);
  const { collections = [], moveToFolder } = useDamViewModel().getDamListViewModel();
  const { closeMoveToFolder } = useDamViewModel().getDamFormViewModel();
  const { t } = useTranslation('common');
  useEffect(() => {
    if (current) {
      const currentItem = collections.find((collection) => +collection.id === +current);
      if (currentItem) {
        setCurrentCollection(currentItem);
      }
    }
    return () => {};
  }, []);

  const goToFolder = (curretnId) => {
    if (curretnId) {
      setCurrentCollection(curretnId);
    } else {
      const backCollection = collections.find(
        (collection) => +collection.id === currentCollection?.parent_id
      );
      if (backCollection) {
        setCurrentCollection(backCollection);
      } else {
        setCurrentCollection(0);
      }
    }

    setSelectCollection(null);
  };

  const onSelect = (collection) => {
    setSelectCollection((prevState) => {
      if (prevState === collection?.id) {
        return null;
      }
      return collection.id;
    });
  };

  const moveTo = () => {
    if (selectCollection) {
      moveToFolder('', selectCollection);
    } else {
      if (currentCollection?.id) {
        moveToFolder('', currentCollection.id);
      } else {
        moveToFolder('', 0);
      }
    }
  };

  return (
    <div className="bg-white rounded-3 border zindex-5 shadow-sm">
      <div className="d-flex ps-2 align-items-center border-bottom h-48px">
        <FontAwesomeIcon
          onClick={() => goToFolder()}
          className={`text-body cursor-pointer ${!currentCollection && 'pe-none opacity-0'}`}
          icon={faArrowLeft}
        />
        <p className="ps-3 m-0">{t('txt_move_to_folder')} </p>
      </div>
      <div className={`w-100 ${styles.list}`}>
        {collections.map((collection, index) => {
          if (+collection.parent_id === (currentCollection.id ? +currentCollection.id : 0)) {
            return (
              collection?.name && (
                <p
                  key={index}
                  className={`text-body m-0 btn border-bottom px-2 d-flex align-items-center py-2 cursor-pointer ${
                    selectCollection === collection.id
                      ? 'rounded-0 btn-success'
                      : 'btn-outline-light'
                  }`}
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
                    <FontAwesomeIcon className="text-body px-2" icon={faFolder} />
                    {collection.name}
                    <FontAwesomeIcon className="text-body ps-2 ms-auto" icon={faArrowRight} />
                  </>
                </p>
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
              className={`zindex-5 ${
                +currentCollection?.id !== +current || selectCollection
                  ? !(current === 0 && currentCollection === 0)
                    ? 'd-none'
                    : ''
                  : ''
              }`}
            >
              {t('txt_item_aldready_in_this_folder')}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <button
              disabled={
                +currentCollection?.id !== +current || selectCollection
                  ? !(current === 0 && currentCollection === 0)
                    ? false
                    : true
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
