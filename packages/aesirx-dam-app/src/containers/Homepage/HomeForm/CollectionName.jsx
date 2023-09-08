import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { DAM_COLLECTION_FIELD_KEY } from 'aesirx-lib';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { DAM_COLUMN_INDICATOR } from 'constants/DamConstant';
import { Form } from 'react-bootstrap';
import styles from '../index.module.scss';
import { notify } from 'aesirx-uikit';
import { useTranslation } from 'react-i18next';
const CollectionName = observer(({ item }) => {
  const { damListViewModel, damFormViewModel } = useDamViewModel();
  const [value, setValue] = useState(item[DAM_COLUMN_INDICATOR.NAME]);
  const [isFocus, setIsFocus] = useState(false);
  const { t } = useTranslation();

  const handleUpdateFolder = useCallback(() => {
    if (value) {
      if (item?.create) {
        damListViewModel.createCollections(
          {
            ...item,
            [DAM_COLLECTION_FIELD_KEY.NAME]: value,
          },
          'server'
        );
      } else {
        if (value !== item[DAM_COLUMN_INDICATOR.NAME]) {
          damListViewModel.updateCollections({
            ...item,
            [DAM_COLLECTION_FIELD_KEY.NAME]: value,
          });
        } else {
          setValue(item[DAM_COLUMN_INDICATOR.NAME]);
        }
      }
    } else {
      notify(t('txt_name_can_not_blank'), 'warn');
    }
    damFormViewModel.setOffEditCollection();
  }, [value]);

  return (
    <Form.Control
      as={'input'}
      type={'text'}
      className={`mw-80 text-body border-0 ps-2 form-control-dam  fw-medium ${
        !damListViewModel.isList ? 'text-center mx-auto fs-6' : 'fs-14 '
      }px-0 py-1 w-fit ${isFocus ? 'pe-auto border-1 border-thumb-name' : 'pe-none'} ${
        styles.input
      }`}
      id={`id_${item[DAM_COLUMN_INDICATOR.ID]}`}
      // defaultValue={value}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={(e) => {
        e.target.select();
        setIsFocus(true);
      }}
      onBlur={() => {
        if (isFocus) {
          handleUpdateFolder();
          setIsFocus(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.target.blur();
        }
      }}
    />
  );
});

export default CollectionName;
