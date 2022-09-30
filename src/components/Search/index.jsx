import { useTranslation } from 'react-i18next';

import HomeStore from 'containers/Homepage/HomeStore/HomeStore';
import HomeViewModel from 'containers/Homepage/HomeViewModels/HomeViewModel';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useState } from 'react';
import { useGlobalViewModel } from 'store/Store';

const Search = (props) => {
  const globalViewModel = useGlobalViewModel();

  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);

    try {
      // Todo: get current colectionId
      const items = await globalViewModel.getGlobalViewModel().globalStore.search(0, query);
      setOptions(items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-search"
      isLoading={isLoading}
      labelKey="name"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder={t('txt_search_all_content')}
      renderMenuItemChildren={(option) => (
        <>
          <span>{option.name}</span>
        </>
      )}
    />
  );
};

export default Search;
