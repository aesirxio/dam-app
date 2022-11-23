/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { DAM_COLUMN_INDICATOR } from 'constants/DamConstant';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DND_ITEM_TYPE = 'row';

function Thumb({
  row,
  className,
  newRowCells,
  index,
  moveRow,
  onDoubleClick,
  onRightClickItem,
  isList = false,
}) {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const [{ isOver }, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    drop: (item, monitor) => {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
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

  const [{ opacity }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  preview(drop(dropRef));
  drag(dragRef);
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
      ref={dropRef}
      style={{ opacity }}
    >
      {newRowCells.map((cell) => {
        if (cell.column.id === DAM_COLUMN_INDICATOR.NAME) {
          return (
            <td {...cell.getCellProps()} ref={dragRef} className="fw-normal px-2 py-3">
              {cell.render('Cell')}
            </td>
          );
        }
        return (
          <td {...cell.getCellProps()} className="fw-normal px-2 py-3">
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  ) : (
    <div ref={dropRef} style={{ opacity }} className={className}>
      <div
        ref={dragRef}
        className={`item_thumb d-flex cursor-move align-items-center justify-content-center  shadow-sm h-100 rounded-2 overflow-hidden flex-column ${
          isOver ? 'border border-success bg-gray-dark' : 'bg-white'
        }`}
        onDoubleClick={() => onDoubleClick(row.original)}
        onContextMenu={(e) => {
          1;
          onRightClickItem(e, row.original);
        }}
      >
        {newRowCells.map((cell) => {
          return (
            <div
              {...cell.getCellProps()}
              className={`ct_cell d-block w-100`}
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

export default Thumb;
