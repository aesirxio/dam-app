import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';

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
      className="d-flex align-items-center text-decoration-none cursor-pointer choose-an-action"
    >
      <div className="text-body ps-3 pe-3 pe-none">
        <p className="mb-0 text-body fw-semibold">{t('choose_an_action')}</p>
      </div>
      <i className="icons text-green pe-none">
        <FontAwesomeIcon icon={faChevronDown} />
      </i>
    </div>
  );
});

const ChooseAction = observer(() => {
  const { t } = useTranslation('common');
  const { openDeleteModal } = useDamViewModel().getDamFormViewModel();

  const Action = useMemo(() => ({
    id: 'action',
    // className: styles.w_272,
    className: 'border-end border-gray-select choose-an-action col-auto ',
    placeholder: t('choose_an_action'),
    options: [
      // {
      //   label: t('txt_preview'),
      //   value: t('txt_preview'),
      // },
      // {
      //   label: t('txt_move_to_folder'),
      //   value: t('txt_move_to_folder'),
      // },
      // {
      //   label: t('txt_download'),
      //   value: t('txt_download'),
      // },
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
        <Dropdown.Menu className="shadow border-0">
          <div className="">
            <ul className="list-unstyled ps-0 mb-0 list_menu_avatar">
              {Action.options.map((value, index) => {
                return (
                  <li key={index}>
                    <Dropdown.Item
                      as={'p'}
                      className="cursor-pointer text-body d-block rounded-1 text-decoration-none mb-0"
                      onClick={value?.onSelect}
                    >
                      {t(value.label)}
                    </Dropdown.Item>
                  </li>
                );
              })}
            </ul>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
});

export default ChooseAction;
