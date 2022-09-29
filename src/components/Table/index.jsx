/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState, lazy } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useExpanded,
  usePagination,
  useRowState,
} from 'react-table';
import { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faColumns } from '@fortawesome/free-solid-svg-icons/faColumns';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faTh } from '@fortawesome/free-solid-svg-icons/faTh';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faFolder } from '@fortawesome/free-regular-svg-icons/faFolder';
import styles from './index.module.scss';
// import './index.scss';
import { withTranslation } from 'react-i18next';
import GlobalFilter from './GlobalFilter';
import SubRowAsync from './RowSubComponent';
import ComponentDatepicker from '../ComponentDatepicker';
import ComponentFilter from '../ComponentFilter';
import PaginationComponent from './PaginationComponent';
import ComponentNoData from '../ComponentNoData';
import { useTranslation } from 'react-i18next';
import ComponentImage from 'components/ComponentImage';
import { DAM_ASSETS_FIELD_KEY } from 'aesirx-dma-lib/src/Constant/DamConstant';
import Dropzone from 'components/Dropzone';

const Select = lazy(() => import('../Select'));

let dataFilter = {
  searchText: '',
  columns: [],
  titleFilter: {},
  datetime: null,
  page: '',
};

let setFilter = (data, key) => {
  switch (key) {
    // keep searchText when render
    case 1:
      return (dataFilter.searchText = data);
    // keep columns hide when render
    case 2:
      return (dataFilter.columns = data);
    // keep title filter when render
    case 3:
      return (dataFilter.titleFilter = data);
    // keep datetime filter when render
    case 4:
      return (dataFilter.datetime = data);
    // keep page when render
    case 5:
      return (dataFilter.page = data);
    case 6:
      dataFilter.searchText = '';
      dataFilter.columns = [];
      dataFilter.titleFilter = {};
      dataFilter.datetime = null;
      dataFilter.page = '';
      break;
    default:
      return null;
  }
};
const Table = ({
  rowData,
  tableRowHeader,
  onSelect,
  isThumb,
  dataList,
  dataThumb,
  thumbColumnsNumber,
  searchText = 'Search...',
  isFilter,
  noSelection = false,
  isList = true,
  pageSize = 5,
  noDropDownColumns = false,
  pagination,
  listViewModel,
  searchFunction,
  dataFormFilter,
  hasSubRow,
  isSearch = true,
  _handleList,
  classNameTable,
  idKey,
  view,
  onDoubleClick,
  createFolder,
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
    // className: styles.w_112,
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
  const Action = useMemo(() => ({
    id: 'action',
    className: styles.w_272,
    placeholder: t('choose_an_action'),
    options: [
      {
        label: t('txt_preview'),
        value: t('txt_preview'),
      },
      {
        label: t('txt_move_to_folder'),
        value: t('txt_move_to_folder'),
      },
      {
        label: t('txt_download'),
        value: t('txt_download'),
      },
      {
        label: t('txt_delete'),
        value: t('txt_delete'),
      },
    ],
  }));
  const sortBy = useMemo(() => ({
    id: 'sort_by',
    // className: styles.w_136,
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    preGlobalFilteredRows,
    allColumns,
    state,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      // filterTypes,
      onSelect,
      initialState: {
        hiddenColumns: dataFilter.columns,
        // pageIndex: getState.indexPagination,
        pageSize: -1,
      },
      // autoResetHiddenColumns: false,
    },
    // useFilters,
    // useGlobalFilter,
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
    useExpanded,
    usePagination,
    useRowSelect
  );

  // useEffect(() => {
  //   const selectedIds = Object.keys(selectedRowIds);
  //   if (selectedIds.length > 0) {
  //     var selectedRowsData = selectedIds
  //       .map((x) => data[x])
  //       .filter(function (x) {
  //         return x != null;
  //       });
  //     onSelect(selectedRowsData);
  //   } else {
  //     onSelect([]);
  //   }
  // }, [selectedRowIds, onSelect, data]);

  // useEffect(() => {
  //   if (view !== dataFilter.page) {
  //     state.hiddenColumns = [];
  //     setFilter(null, 6);
  //     setFilter(view, 5);
  //     setState({ isFilter: false });
  //   }
  // }, [view]);

  // useEffect(() => {
  //   if (setFilter) {
  //     setFilter(state.hiddenColumns, 2);
  //   }
  //   return () => {};
  // }, [state.hiddenColumns]);

  // const setGlobalFilter = (dataFilter) => {
  //   if (searchFunction !== undefined) {
  //     const finalDataFilter = {
  //       ...getState.dataFilter,
  //       ...dataFilter,
  //     };
  //     setState({
  //       ...getState,
  //       dataFilter: finalDataFilter,
  //     });

  //     searchFunction(finalDataFilter || undefined);
  //   }
  // };

  // const renderRowSubComponent = React.useCallback(
  //   ({ row, rowProps, visibleColumns }) => (
  //     <SubRowAsync
  //       row={row}
  //       rowProps={rowProps}
  //       visibleColumns={visibleColumns}
  //       listViewModel={listViewModel ? listViewModel : null}
  //       idKey={idKey}
  //     />
  //   ),
  //   [listViewModel, idKey]
  // );

  // const handleFilter = () => {
  //   setState({
  //     ...getState,
  //     isFilter: !getState.isFilter,
  //   });
  // };
  return (
    <>
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
              />
            </div>
            <div className={Action.className}>
              <Select
                placeholder={Action.placeholder}
                isClearable={false}
                isSearchable={false}
                options={Action.options}
              />
            </div>
            <div className={sortBy.className}>
              <Select
                placeholder={sortBy.placeholder}
                isClearable={false}
                isSearchable={false}
                options={sortBy.options}
                onChange={onSortby}
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
        <div className="bg-white p-3 rounded-3">
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
                  <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue">
                    {newHeaderGroup.map((column) => {
                      return (
                        <th
                          {...column.getHeaderProps()}
                          className="fw-normal px-2 py-3 flex-1 bg-blue"
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
              {page.length > 0 &&
                page.map((row) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  let newRowCells = '';

                  dataList
                    ? (newRowCells = row.cells.filter(
                        (item) => !dataList.some((other) => item.column.id === other)
                      ))
                    : (newRowCells = row.cells);

                  return (
                    <tr
                      key={row.getRowProps().key}
                      {...row.getRowProps()}
                      className="border-bottom-1 cursor-pointer"
                      //onClick={(e) => handerEdit(e, row.original)}
                    >
                      {newRowCells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="fw-normal px-2 py-3">
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {page.length === 0 ? (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title="No Matching Results"
              text="Can not found any project with that keyword. Please try another keyword."
              width="w-50"
            />
          ) : null}
        </div>
      ) : (
        <div {...getTableBodyProps()} className="row">
          {page.map((row, index) => {
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
                    <p>{t('txt_file')}</p>
                  </div>
                  <div
                    {...row.getRowProps()}
                    className={`col_thumb cursor-pointer ${styles.col_thumb} col-${
                      !thumbColumnsNumber ? '3' : thumbColumnsNumber
                    } mb-4 zindex-2`}
                    //onClick={(e) => handerEdit(e, row.original)}
                    key={Math.random(40, 200)}
                    onContextMenu={(e) => {
                      onRightClickItem(e, row.original);
                    }}
                  >
                    <div
                      className={`item_thumb d-flex align-items-center justify-content-center  bg-white shadow-sm h-100 rounded-2  flex-column`}
                      key={Math.random(40, 200)}
                      onDoubleClick={
                        row.original[DAM_ASSETS_FIELD_KEY.TYPE]
                          ? () => {}
                          : () => onDoubleClick(row.original.id)
                      }
                      onContextMenu={() => {
                        console.log(123);
                      }}
                    >
                      {newRowCells.map((cell) => {
                        return (
                          <div
                            {...cell.getCellProps()}
                            className={`ct_cell ${styles.ct_cell} d-block`}
                            key={Math.random(40, 200)}
                          >
                            {cell.render('Cell')}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            }
            return (
              newRowCells.length > 0 && (
                <React.Fragment key={Math.random(40, 200)}>
                  <div
                    {...row.getRowProps()}
                    className={`col_thumb cursor-pointer ${styles.col_thumb} col-${
                      !thumbColumnsNumber ? '3' : thumbColumnsNumber
                    } mb-4 zindex-2`}
                    //onClick={(e) => handerEdit(e, row.original)}
                    key={Math.random(40, 200)}
                  >
                    <div
                      className={`item_thumb d-flex align-items-center justify-content-center  bg-white shadow-sm h-100 rounded-2  flex-column`}
                      key={Math.random(40, 200)}
                      onDoubleClick={
                        row.original[DAM_ASSETS_FIELD_KEY.TYPE]
                          ? () => {}
                          : () => onDoubleClick(row.original.id)
                      }
                      onContextMenu={(e) => {
                        onRightClickItem(e, row.original);
                      }}
                    >
                      {newRowCells.map((cell) => {
                        return (
                          <div
                            {...cell.getCellProps()}
                            className={`ct_cell ${styles.ct_cell} d-block`}
                            key={Math.random(40, 200)}
                          >
                            {cell.render('Cell')}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              )
            );
          })}

          {page.length === 0 ? (
            <ComponentNoData
              icons="/assets/images/ic_project.svg"
              title="No Matching Results"
              text="Can not found any project with that keyword. Please try another keyword."
              width="w-50"
            />
          ) : (
            <>
              <div
                className={`col_thumb cursor-pointer ${styles.col_thumb} col-${
                  !thumbColumnsNumber ? '3' : thumbColumnsNumber
                } mb-4 zindex-2`}
              >
                <div className="item_thumb d-flex bg-white shadow-sm rounded-2  flex-column">
                  <Dropzone createAssets={createAssets}>
                    <div
                      className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none cursor-pointer`}
                    >
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className=" d-inline-block align-text-bottom"
                      />

                      <span className="ms-3 text py-1 d-inline-block">{t('txt_upload_file')}</span>
                    </div>
                  </Dropzone>
                  <div
                    className={`d-flex align-items-center rounded-1 px-3 py-2 mb-1  text-decoration-none `}
                    onClick={createFolder}
                  >
                    <FontAwesomeIcon
                      icon={faFolder}
                      className=" d-inline-block align-text-bottom"
                    />

                    <span className="ms-3 text py-1 d-inline-block">{t('txt_create_folder')}</span>
                  </div>
                </div>
              </div>
              <div className="position-absolute h-100 w-100 top-0 start-0 zindex-1">
                <Dropzone noClick={true} />
              </div>
            </>
          )}
        </div>
      )}
    </>
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
