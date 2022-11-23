/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, useEffect, useMemo } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';

import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';
import {
  DAM_ASSETS_FIELD_KEY,
  DAM_COLLECTION_FIELD_KEY,
} from 'aesirx-dma-lib/src/Constant/DamConstant';
import Dropzone from 'components/Dropzone';
import { useTranslation, withTranslation } from 'react-i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ComponentNoData from '../ComponentNoData';
import Thumb from './Thumb';
import { notify } from 'components/Toast';

const Select = lazy(() => import('../Select'));

let dataFilter = {
  searchText: '',
  columns: [],
  titleFilter: {},
  datetime: null,
  page: '',
};

const Table = ({
  rowData,
  tableRowHeader,
  onSelect,
  isThumb,
  dataList,
  dataThumb,
  thumbColumnsNumber,
  noSelection = false,
  isList = true,
  listViewModel,
  _handleList,
  classNameTable,
  onDoubleClick,
  // createFolder,
  createAssets,
  onFilter,
  onSortby,
  onRightClickItem,
}) => {
  const { t } = useTranslation('common');

  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input className="form-check-input p-0" type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });

  const columns = useMemo(() => tableRowHeader, [tableRowHeader]);

  const data = useMemo(() => rowData, [rowData]);

  const filterBar = useMemo(() => ({
    id: 'type',
    placeholder: t('txt_type'),
    options: [
      {
        label: t('txt_image'),
        value: 'image',
      },
      {
        label: t('txt_video'),
        value: 'video',
      },
      {
        label: t('txt_document'),
        value: 'document',
      },
      {
        label: t('txt_audio'),
        value: 'audio',
      },
    ],
  }));

  const sortBy = useMemo(() => ({
    id: 'sort_by',
    placeholder: t('txt_sort_by'),
    options: [
      {
        label: t('txt_date_create'),
        value: {
          ordering: DAM_ASSETS_FIELD_KEY.LAST_MODIFIED,
          direction: 'asc',
        },
      },
      {
        label: t('txt_last_modified'),
        value: {
          ordering: DAM_ASSETS_FIELD_KEY.LAST_MODIFIED,
          direction: 'desc',
        },
      },
      {
        label: t('txt_a_z'),
        value: {
          ordering: DAM_ASSETS_FIELD_KEY.NAME,
          direction: 'asc',
        },
      },
      {
        label: t('txt_z_a'),
        value: {
          ordering: DAM_ASSETS_FIELD_KEY.NAME,
          direction: 'desc',
        },
      },
    ],
  }));

  let check = 0;

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      onSelect,
      initialState: {
        hiddenColumns: dataFilter.columns,
        pageSize: -1,
      },
    },
    (hooks) => {
      !noSelection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="wrapper_checkbox">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    },
    usePagination,
    useRowSelect
  );

  const moveRow = (dragIndex, hoverIndex) => {
    if (dragIndex?.[DAM_ASSETS_FIELD_KEY.TYPE] && !hoverIndex?.[DAM_ASSETS_FIELD_KEY.TYPE]) {
      listViewModel.updateAssets({
        ...dragIndex,
        [DAM_ASSETS_FIELD_KEY.COLLECTION_ID]: hoverIndex?.[DAM_COLLECTION_FIELD_KEY.ID],
      });
      notify(
        t('txt_move_with_file_or_folder', {
          type: t('txt_file'),
          name: dragIndex?.[DAM_ASSETS_FIELD_KEY.NAME],
          name_folder: hoverIndex?.[DAM_COLLECTION_FIELD_KEY.NAME],
        })
      );
    } else if (!hoverIndex?.[DAM_ASSETS_FIELD_KEY.TYPE]) {
      listViewModel.updateCollections({
        ...dragIndex,
        [DAM_COLLECTION_FIELD_KEY.PARENT_ID]: hoverIndex?.[DAM_COLLECTION_FIELD_KEY.ID],
      });
      notify(
        t('txt_move_with_file_or_folder', {
          type: t('txt_folders'),
          name: dragIndex?.[DAM_COLLECTION_FIELD_KEY.NAME],
          name_folder: hoverIndex?.[DAM_COLLECTION_FIELD_KEY.NAME],
        })
      );
    } else {
      notify(t('txt_can_not_move'), 'warning');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`mb-4 zindex-3 ${classNameTable}`}>
        <div className="bg-white shadow-sm rounded-3 d-flex align-items-center justify-content-between">
          <div className="wrapper_search_global d-flex align-items-center">
            <div className={filterBar.className}>
              <Select
                placeholder={filterBar.placeholder}
                isClearable={false}
                isSearchable={false}
                options={filterBar.options}
                onChange={onFilter}
                defaultValue={filterBar.options.find(
                  (e) => e.value === listViewModel.dataFilter['filter[type]']
                )}
              />
            </div>

            <div className={sortBy.className}>
              <Select
                placeholder={sortBy.placeholder}
                isClearable={false}
                isSearchable={false}
                options={sortBy.options}
                onChange={onSortby}
                defaultValue={sortBy.options.find(
                  (e) =>
                    e.value.ordering === listViewModel.dataFilter['list[ordering]'] &&
                    e.value.direction === listViewModel.dataFilter['list[direction]']
                )}
              />
            </div>
          </div>
          {isThumb && (
            <div className="d-flex align-items-center">
              <button
                type="button"
                className={`btn text-blue-0 rounded-0 px-4 shadow-none ${
                  isList ? 'bg-blue-3' : ''
                }`}
                onClick={() => _handleList('list')}
              >
                <i>
                  <FontAwesomeIcon icon={faList} />
                </i>
                <span className="ms-2 opacity-75">{t('txt_list')}</span>
              </button>
              <button
                type="button"
                className={`btn text-blue-0 rounded-0 px-4 shadow-none ${
                  !isList ? 'bg-blue-3' : ''
                }`}
                onClick={() => _handleList('thumb')}
              >
                <i>
                  <FontAwesomeIcon icon={faTh} />
                </i>
                <span className="ms-2 opacity-75">{t('txt_thumb')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {isList ? (
        <div className="bg-white p-3 rounded-3 col">
          {rows.length ? (
            <table {...getTableProps()} className={`w-100 mb-4 ${classNameTable}`}>
              <thead>
                {headerGroups.map((headerGroup) => {
                  let newHeaderGroup = '';

                  dataList
                    ? (newHeaderGroup = headerGroup.headers.filter(
                        (item) => !dataList.some((other) => item.id === other)
                      ))
                    : (newHeaderGroup = headerGroup.headers);

                  return (
                    <tr {...headerGroup.getHeaderGroupProps()} className="bg-white">
                      {newHeaderGroup.map((column) => {
                        return (
                          <th
                            {...column.getHeaderProps()}
                            className="fw-normal px-2 py-3 flex-1 bg-white"
                          >
                            {column.render('Header')}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.length > 0 &&
                  rows.map((row, index) => {
                    prepareRow(row);
                    let newRowCells = '';

                    dataList
                      ? (newRowCells = row.cells.filter(
                          (item) => !dataList.some((other) => item.column.id === other)
                        ))
                      : (newRowCells = row.cells);

                    return (
                      <Thumb
                        {...row.getRowProps()}
                        isList={true}
                        className={`zindex-2 ${index % 2 === 0 ? 'bg-gray-400' : 'bg-white'}`}
                        key={Math.random(40, 200)}
                        newRowCells={newRowCells}
                        index={row.original}
                        row={row}
                        onDoubleClick={onDoubleClick}
                        onRightClickItem={onRightClickItem}
                        moveRow={moveRow}
                        type={row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? 'assets' : 'folder'}
                      />
                    );
                  })}
              </tbody>
            </table>
          ) : null}

          {rows.length === 0 ? (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title="No Matching Results"
              text="Can not found any project with that keyword. Please try another keyword."
              width="w-50"
              createAssets={createAssets}
            />
          ) : null}
        </div>
      ) : (
        <div {...getTableBodyProps()} className={`row ${rows.length === 0 ? 'col' : ''}`}>
          {rows.map((row, index) => {
            prepareRow(row);
            let newRowCells = row.cells;
            if (dataThumb && dataThumb.length > 0) {
              newRowCells = row.cells.filter(
                (item) => !dataThumb.some((other) => item.column.id === other)
              );
            }

            if (row.original[DAM_ASSETS_FIELD_KEY.TYPE] && check === 0) {
              check = 1;
              return (
                <React.Fragment key={Math.random(40, 200)}>
                  <div className="col-12">
                    <p className="fw-bold">{t('txt_file')}</p>
                  </div>

                  {/* Item */}
                  <Thumb
                    {...row.getRowProps()}
                    className={`col_thumb ${styles.col_thumb} col-${
                      !thumbColumnsNumber ? '3' : thumbColumnsNumber
                    } mb-4 zindex-2`}
                    key={Math.random(40, 200)}
                    newRowCells={newRowCells}
                    index={row.original}
                    row={row}
                    onDoubleClick={onDoubleClick}
                    onRightClickItem={onRightClickItem}
                    moveRow={moveRow}
                    type="assets"
                  />
                </React.Fragment>
              );
            } else if (check === 0 && rows.length === index + 1) {
              check = 1;
              return (
                <React.Fragment key={Math.random(40, 200)}>
                  <Thumb
                    {...row.getRowProps()}
                    className={`col_thumb ${styles.col_thumb} col-${
                      !thumbColumnsNumber ? '3' : thumbColumnsNumber
                    } mb-4 zindex-2`}
                    key={Math.random(40, 200)}
                    newRowCells={newRowCells}
                    index={row.original}
                    row={row}
                    onDoubleClick={onDoubleClick}
                    onRightClickItem={onRightClickItem}
                    moveRow={moveRow}
                    type={row.original[DAM_ASSETS_FIELD_KEY.TYPE] ? 'assets' : 'folder'}
                  />
                </React.Fragment>
              );
            }
            return (
              newRowCells.length > 0 && (
                <React.Fragment key={Math.random(40, 200)}>
                  {index === 0 ? (
                    <div className="col-12">
                      <p className="fw-bold">{t('txt_folders')}</p>
                    </div>
                  ) : null}
                  <Thumb
                    {...row.getRowProps()}
                    className={`col_thumb ${styles.col_thumb} col-${
                      !thumbColumnsNumber ? '3' : thumbColumnsNumber
                    } mb-4 zindex-2`}
                    key={Math.random(40, 200)}
                    newRowCells={newRowCells}
                    index={row.original}
                    row={row}
                    onDoubleClick={onDoubleClick}
                    onRightClickItem={onRightClickItem}
                    moveRow={moveRow}
                    type="folder"
                  />
                </React.Fragment>
              )
            );
          })}

          {rows.length === 0 ? (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title="No Matching Results"
              text="Can not found any project with that keyword. Please try another keyword."
              width="w-50"
              createAssets={createAssets}
            />
          ) : (
            <Dropzone isBtn={false} noDrag={false} createAssets={createAssets} noClick={true} />
          )}
        </div>
      )}
    </DndProvider>
  );
};

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

export default withTranslation('common')(Table);
