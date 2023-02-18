/* eslint-disable react/display-name */
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import React, { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { observer } from 'mobx-react';

export const DND_ITEM_TYPE = 'thumb';
let timer = 0;
let delay = 200;
let prevent = false;

const FakeThumb = observer(({ id }) => {
  const {
    damListViewModel: {
      actionState: { selectedCards },
    },
  } = useDamViewModel();
  const isSelect = selectedCards.map((selectedCard) => +selectedCard.id).includes(+id);
  return (
    <span
      className={`position-absolute top-0 start-0 w-100 h-100 pe-none user-select-none ${
        isSelect ? 'border border-success bg-gray-dark' : ''
      }`}
    ></span>
  );
});

const ThumbContainer = React.memo(({ newRowCells }) => {
  return newRowCells.map((cell) => (
    <div
      {...cell.getCellProps()}
      className={`ct_cell d-block w-100 user-select-none`}
      key={Math.random(40, 200)}
    >
      {cell.render('Cell')}
    </div>
  ));
});

const Thumb = observer(
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
    // rearrangeCards,
    // setInsertIndex,
    onSelectionChange,
    // clearItemSelection = () => {},
  }) => {
    const ref = React.useRef(null);
    const {
      damListViewModel: {
        actionState: { selectedCards },
      },
      damFormViewModel: { showCreateCollectionModal },
    } = useDamViewModel();

    const [{ isOver }, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      drop: (item) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.items;
        const hoverIndex = +row.original.id;
        // Don't replace items with themselves
        if (dragIndex.map((dragItem) => +dragItem.id).includes(hoverIndex)) {
          return;
        }

        // If assets don't do anything
        if (row.original?.[DAM_ASSETS_FIELD_KEY.TYPE]) {
          return;
        }

        moveRow(dragIndex, hoverIndex);
      },
      collect: (monitor) => {
        if (monitor.getItem()) {
          const checkItemSelect = monitor.getItem()?.items.map((item) => +item.id);
          if (checkItemSelect.includes(+row?.original.id)) {
            return false;
          } else {
            return {
              isOver: monitor.isOver(),
            };
          }
        } else {
          return false;
        }
      },
    });

    const [{ opacity }, drag, preview] = useDrag({
      type: DND_ITEM_TYPE,
      item: () => {
        const { id } = row.original;
        const draggedCard = row.original;
        let cards = [];
        if (selectedCards.find((card) => +card.id === +id)) {
          cards = selectedCards;
        } else {
          // clearItemSelection();
          cards = [draggedCard];
        }
        const cardsIDs = cards;
        return { items: cardsIDs };
      },
      isDragging: (monitor) => {
        return monitor
          .getItem()
          .items.map((item) => +item.id)
          .includes(+row.original.id);
      },
      canDrag: () => {
        return showCreateCollectionModal ? false : true;
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    });

    const onSelect = (e) => {
      onSelectionChange(index, e.metaKey, e.shiftKey, e.ctrlKey);
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

    drag(drop(ref));

    return isList ? (
      <tr
        key={row.getRowProps().key}
        {...row.getRowProps()}
        className={`position-relative item_thumb cursor-move ${
          isOver ? 'border border-success bg-gray-dark' : 'border-none'
        } ${className}`}
        onDoubleClick={() => {
          onDoubleClick(row.original);
        }}
        onContextMenu={(e) => {
          onRightClickItem(e, { ...row.original, index });
        }}
        style={{ opacity }}
        type={type}
        ref={ref}
      >
        {newRowCells.map((cell, index) => {
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
          className={`position-relative item_thumb d-flex cursor-move align-items-center justify-content-center shadow-sm h-100 rounded-2 overflow-hidden flex-column ${
            isOver ? 'border border-success bg-gray-dark' : 'bg-white'
          }`}
          onContextMenu={(e) => {
            onRightClickItem(e, { ...row.original, index });
          }}
          ref={ref}
          onDoubleClick={() => {
            clearTimeout(timer);
            prevent = true;
            if (!showCreateCollectionModal) {
              onDoubleClick(row.original);
            }
          }}
          onClick={(e) => {
            timer = setTimeout(function () {
              if (!prevent) {
                onSelect(e);
              }
              prevent = false;
            }, delay);
          }}
          type={type}
        >
          <ThumbContainer newRowCells={newRowCells} />
          <FakeThumb id={+row.original.id} />
        </div>
      </div>
    );
  }
);

export default Thumb;
