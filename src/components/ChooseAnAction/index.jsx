import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import styles from './index.module.scss';
// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ onClick }, ref) => {
  const { t } = useTranslation('common');

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center text-decoration-none cursor-pointer choose-an-action justify-content-between w-100 h-100 px-3 mt-n1"
    >
      <div className="pe-3 pe-none">
        <p className="mb-0 text-blue-0 fw-semibold fs-14">{t('choose_an_action')}</p>
      </div>
      <i className="icons text-green pe-none">
        <FontAwesomeIcon icon={faChevronDown} />
      </i>
    </div>
  );
});

const ChooseAction = observer(() => {
  const { t } = useTranslation('common');
  const { openDeleteModal, openMoveToFolder, downloadFile } =
    useDamViewModel().getDamFormViewModel();
  const { setActionState } = useDamViewModel().getDamListViewModel();

  const Action = useMemo(() => ({
    id: 'action',
    // className: styles.w_272,
    className:
      'border-end border-gray-select bg-select-control-background choose-an-action col-auto fs-14 minw-272px',
    placeholder: t('choose_an_action'),
    options: [
      {
        label: t('txt_preview'),
        value: t('txt_preview'),
      },
      {
        label: t('txt_move_to_folder'),
        value: t('txt_move_to_folder'),
        onSelect: (e) => {
          const innerHeight = window.innerHeight;
          const innerWidth = window.innerWidth;
          let style = {
            transition: 'none',
            top: e.clientY,
            left: e.clientX,
          };
          if (e.clientX + 200 > innerWidth) {
            style = {
              ...style,
              right: innerWidth - e.clientX,
              left: 'unset',
            };
          }
          if (e.clientY + 260 > innerHeight) {
            style = {
              ...style,
              bottom: innerHeight - e.clientY,
              top: 'unset',
            };
          }
          setActionState({
            style: style,
          });
          openMoveToFolder();
        },
      },
      {
        label: t('txt_download'),
        value: t('txt_download'),
        onSelect: downloadFile,
      },
      {
        label: t('txt_delete'),
        value: t('txt_delete'),
        onSelect: openDeleteModal,
      },
    ],
  }));
  return (
    <div className={Action.className}>
      <Dropdown className="h-100 d-flex align-items-center">
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components position-relative pe-none"
        ></Dropdown.Toggle>
        <Dropdown.Menu
          className={`shadow-sm bg-select-control-background border border-gray-select rounded-0 rounded-bottom w-100 ${styles.border_top}`}
        >
          <ul className="list-unstyled ps-0 mb-0 list_menu_avatar">
            {Action.options.map((value, index) => {
              return (
                <li key={index}>
                  <Dropdown.Item
                    as={'p'}
                    className={`cursor-pointer fs-14 text-blue-0 d-block rounded-1 text-decoration-none mb-0 ${styles.dropdown_item}`}
                    onClick={value?.onSelect}
                  >
                    {t(value.label)}
                  </Dropdown.Item>
                </li>
              );
            })}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default ChooseAction;
