/* eslint-disable react/display-name */
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React, { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DAM_COLUMN_INDICATOR } from 'constants/DamConstant';
import { useDrag, useDrop } from 'react-dnd';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';

export const DND_ITEM_TYPE = 'row';
let timer = 0;
let delay = 200;
let prevent = false;
const Thumb = React.memo(
  ({
    row,
    className,
    newRowCells,
    index,
    moveRow,
    onDoubleClick,
    onRightClickItem,
    isList = false,
    type,
    selectedCards,
    // rearrangeCards,
    // setInsertIndex,
    onSelectionChange,
    clearItemSelection,
  }) => {
    const ref = React.useRef(null);

    const [{ isOver }, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      drop: (item) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.cards.map((card) => card.id);
        const hoverIndex = row.original.id;
        // Don't replace items with themselves
        if (dragIndex.includes(hoverIndex)) {
          return;
        }
        if (row.original?.[DAM_ASSETS_FIELD_KEY.TYPE]) {
          return;
        }
        // // Determine rectangle on screen
        // const hoverBoundingRect = ref.current.getBoundingClientRect();
        // // Get vertical middle
        // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        // // Get pixels to the top
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // // Only perform the move when the mouse has crossed half of the items height
        // // When dragging downwards, only move when the cursor is below 50%
        // // When dragging upwards, only move when the cursor is above 50%
        // // Dragging downwards
        // if (hoverClientY < hoverMiddleY) {
        //   return;
        // }
        // // Dragging upwards
        // if (hoverClientY > hoverMiddleY) {
        //   return;
        // }
        // Time to actually perform the action

        moveRow(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.    // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
      collect: (monitor) => {
        return {
          isOver: monitor.isOver(),
        };
      },
    });

    const [{ isDragging }, drag, preview] = useDrag({
      type: DND_ITEM_TYPE,
      item: () => {
        const { id } = row.original;
        const draggedCard = { id };
        let cards;
        if (selectedCards.find((card) => +card.id === +id)) {
          cards = selectedCards;
        } else {
          clearItemSelection();
          cards = [draggedCard];
        }

        const cardsIDs = cards.map((c) => +c.id);
        return { cards, cardsIDs };
      },

      isDragging: (monitor) => {
        return monitor.getItem().cardsIDs.includes(+row.original.id);
      },
      end: () => {
        // rearrangeCards(item);
        clearItemSelection();
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drag(drop(ref));

    const onClick = (e) => {
      onSelectionChange(index, e.metaKey, e.shiftKey);
    };

    useEffect(() => {
      // This gets called after every render, by default
      // (the first one, and every one after that)

      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      preview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      });
      // If you want to implement componentWillUnmount,
      // return a function from here, and React will call
      // it prior to unmounting.
      // return () => console.log('unmounting...');
    }, []);
    const opacity = isDragging ? 0.4 : 1;
    const isSelect = selectedCards.map((selectedCard) => selectedCard.id).includes(row.original.id);
    return isList ? (
      <tr
        key={row.getRowProps().key}
        {...row.getRowProps()}
        className={`cursor-pointer ${
          isOver ? 'border border-success bg-gray-dark' : 'border-none'
        } ${className}`}
        onDoubleClick={() => onDoubleClick(row.original)}
        onContextMenu={(e) => {
          onRightClickItem(e, row.original);
        }}
        style={{ opacity }}
        type={type}
      >
        {newRowCells.map((cell, index) => {
          if (cell.column.id === DAM_COLUMN_INDICATOR.NAME) {
            return (
              <td key={index} {...cell.getCellProps()} className="fw-normal px-2 py-3 cursor-move">
                {cell.render('Cell')}
              </td>
            );
          }
          return (
            <td key={index} {...cell.getCellProps()} className="fw-normal px-2 py-3">
              {cell.render('Cell')}
            </td>
          );
        })}
      </tr>
    ) : (
      <div style={{ opacity }} className={className}>
        <div
          className={`item_thumb d-flex cursor-move align-items-center  justify-content-center  shadow-sm h-100 rounded-2 overflow-hidden flex-column ${
            isOver || isSelect ? 'border border-success bg-gray-dark' : 'bg-white'
          }`}
          onDoubleClick={() => {
            clearTimeout(timer);
            prevent = true;
            onDoubleClick(row.original);
          }}
          onContextMenu={(e) => {
            onRightClickItem(e, row.original);
          }}
          ref={ref}
          onClick={(e) => {
            timer = setTimeout(function () {
              if (!prevent) {
                onClick(e);
              }
              prevent = false;
            }, delay);
          }}
          type={type}
        >
          {newRowCells.map((cell) => {
            return (
              <div
                {...cell.getCellProps()}
                className={`ct_cell d-block w-100 user-select-none pe-none`}
                key={Math.random(40, 200)}
              >
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Thumb;
