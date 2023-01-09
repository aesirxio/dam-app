/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useReducer } from 'react';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';
import styles from './index.module.scss';
import { useTranslation, withTranslation } from 'react-i18next';

const Thumb = React.lazy(() => import('./Thumb'));
const ArrowBack = React.lazy(() => import('SVG/ArrowBack'));
// const ThumbDragLayer = React.lazy(() => import('./ThumbDragLayer'));

const cardReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedCards: [],
        lastSelectedIndex: -1,
      };
    case 'UPDATE_SELECTION':
      return {
        ...state,
        selectedCards: action.newSelectedCards,
        lastSelectedIndex: action.newLastSelectedIndex,
      };
    case 'REARRANGE_CARDS':
      return { ...state, cards: action.newCards };
    case 'SET_INSERTINDEX':
      return {
        ...state,
        dragIndex: action.dragIndex,
        hoverIndex: action.hoverIndex,
        insertIndex: action.insertIndex,
      };
    case 'SET_CARDS':
      return {
        ...state,
        cards: action.cards,
      };
    default:
      throw new Error();
  }
};

const ThumbContainer = ({
  getTableBodyProps,
  rows,
  dataThumb,
  listViewModel,
  thumbColumnsNumber,
  prepareRow,
  onDoubleClick,
  onRightClickItem,
  moveRow,
  onBackClick,
  rowData = [],
  dataCollections = [],
  // dataAssets = [],
}) => {
  const { t } = useTranslation('common');
  const [state, dispatch] = useReducer(cardReducer, {
    cards: [],
    selectedCards: [],
    lastSelectedIndex: -1,
    dragIndex: -1,
    hoverIndex: -1,
    insertIndex: -1,
    isDragging: false,
  });
  useEffect(() => {
    dispatch({
      type: 'SET_CARDS',
      cards: rowData.map((data) => ({ id: data.id })),
    });
    return () => {};
  }, [rowData]);

  const clearItemSelection = () => {
    console.log('clearItemSelection');
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  const handleItemSelection = (index, cmdKey, shiftKey) => {
    let newSelectedCards;
    const cards = state.cards;
    const card = index < 0 ? '' : cards[index];
    const newLastSelectedIndex = index;

    if (!cmdKey && !shiftKey) {
      newSelectedCards = [card];
    } else if (shiftKey) {
      if (state.lastSelectedIndex >= index) {
        newSelectedCards = [].concat.apply(
          state.selectedCards,
          cards.slice(index, state.lastSelectedIndex)
        );
      } else {
        newSelectedCards = [].concat.apply(
          state.selectedCards,
          cards.slice(state.lastSelectedIndex + 1, index + 1)
        );
      }
    } else if (cmdKey) {
      const foundIndex = state.selectedCards.findIndex((f) => f === card);
      // If found remove it to unselect it.
      if (foundIndex >= 0) {
        newSelectedCards = [
          ...state.selectedCards.slice(0, foundIndex),
          ...state.selectedCards.slice(foundIndex + 1),
        ];
      } else {
        newSelectedCards = [...state.selectedCards, card];
      }
    }
    const finalList = cards ? cards.filter((f) => newSelectedCards.find((a) => a === f)) : [];
    dispatch({
      type: 'UPDATE_SELECTION',
      newSelectedCards: finalList,
      newLastSelectedIndex: newLastSelectedIndex,
    });
  };

  const rearrangeCards = (dragItem) => {
    console.log('rearrangeCards');
    console.log(dragItem);
    moveRow(dragItem.card);
  };

  const setInsertIndex = (dragIndex, hoverIndex) => {
    console.log('setInsertIndex');
    console.log(dragIndex, hoverIndex);
    if (state.dragIndex === dragIndex && state.hoverIndex === hoverIndex) {
      return;
    }
    dispatch({
      type: 'SET_INSERTINDEX',
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <div {...getTableBodyProps()} className={`row ${rows.length === 0 ? 'col' : ''}`}>
      {rows.map((row, index) => {
        prepareRow(row);
        let newRowCells = row.cells;
        if (dataThumb && dataThumb.length > 0) {
          newRowCells = row.cells.filter(
            (item) => !dataThumb.some((other) => item.column.id === other)
          );
        }

        return (
          newRowCells.length > 0 && (
            <React.Fragment key={row?.original?.id}>
              {index === 0 && !row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? (
                <>
                  <div className="col-12">
                    <p className="fw-bold text-blue-0">{t('txt_folders')}</p>
                  </div>
                  {listViewModel?.damLinkFolder.split('/').length > 1 && (
                    <div
                      className={`col_thumb ${styles.col_thumb} col-${
                        !thumbColumnsNumber ? '3' : thumbColumnsNumber
                      } mb-4 zindex-2`}
                    >
                      <div
                        className={`item_thumb d-flex cursor-pointer align-items-center justify-content-center  shadow-sm h-100 rounded-2 overflow-hidden flex-column bg-white
										`}
                        onClick={onBackClick}
                      >
                        <ArrowBack />
                        <span>{t('txt_back')}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
              {dataCollections.length === index && row.original[DAM_ASSETS_FIELD_KEY.TYPE] && (
                <>
                  <div className="col-12">
                    <p className="fw-bold text-blue-0">{t('txt_file')}</p>
                  </div>
                  {index === 0 && listViewModel?.damLinkFolder.split('/').length > 1 && (
                    <div
                      className={`col_thumb ${styles.col_thumb} col-${
                        !thumbColumnsNumber ? '3' : thumbColumnsNumber
                      } mb-4 zindex-2`}
                    >
                      <div
                        className={`item_thumb d-flex cursor-pointer align-items-center justify-content-center  shadow-sm h-100 rounded-2 overflow-hidden flex-column bg-white
						`}
                        onClick={onBackClick}
                      >
                        <ArrowBack />
                        <span>{t('txt_back')}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
              <Thumb
                {...row.getRowProps()}
                className={`col_thumb ${styles.col_thumb} col-${
                  !thumbColumnsNumber ? '3' : thumbColumnsNumber
                } mb-4 zindex-2`}
                newRowCells={newRowCells}
                index={index}
                row={row}
                onDoubleClick={onDoubleClick}
                onRightClickItem={onRightClickItem}
                moveRow={moveRow}
                type={row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? 'assets' : 'folder'}
                selectedCards={state.selectedCards}
                rearrangeCards={rearrangeCards}
                setInsertIndex={setInsertIndex}
                onSelectionChange={handleItemSelection}
                clearItemSelection={clearItemSelection}
              />
            </React.Fragment>
          )
        );
      })}
    </div>
  );
};

export default withTranslation('common')(ThumbContainer);
