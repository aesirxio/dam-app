import React from 'react';
import { useTranslation } from 'react-i18next';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useState } from 'react';
import { useDamViewModel } from 'store/DamStore/DamViewModelContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { observer } from 'mobx-react';
import styles from './index.module.scss';
const Search = observer(() => {
  const damListViewModel = useDamViewModel();
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);

    try {
      const items = await damListViewModel.damListViewModel.damStore.search(query);
      setOptions(items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleChange = (data) => {
    damListViewModel.damFormViewModel.damEditdata = data[0];
    damListViewModel.damFormViewModel.openModal();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      damListViewModel.damListViewModel.isSearch = true;
      const assets = options.filter((asset) => asset.type);
      const collections = options.filter((collection) => !collection.type);
      if (assets) {
        damListViewModel.damListViewModel.assets = assets;
      }

      if (collections) {
        damListViewModel.damListViewModel.collections = collections;
      }
    }
  };
  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <div
      className={`input-group rounded-3 d-flex mb-0 pe-2 wr_input_search bg-theme ${styles.width}`}
    >
      <button
        type="button"
        id="button-search"
        className="btn btn_search border-0 col-auto text-green"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      <AsyncTypeahead
        filterBy={filterBy}
        id="async-search"
        isLoading={isLoading}
        labelKey="name"
        minLength={1}
        onSearch={handleSearch}
        options={options}
        className="col bg-theme"
        inputProps={{
          className: `border-0 w-100 shadow-none bg-theme fw-semibold ${styles.input}`,
        }}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={t('txt_search_all_content')}
        renderMenuItemChildren={(option) => (
          <>
            <span>{option.name}</span>
          </>
        )}
      />
    </div>
  );
});

export default Search;
