import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FilterConfig, FilterUpdate } from '../schemas';
import Sidebar from './sidebar';
import FilterOptions from '../components/FilterSelector';

const styles = {
  container: {
    flexDirection: 'row' as const,
    flex: 1,
  },
};

export interface MainProps {
  filters: FilterConfig[];
  onFilterChange: (update: FilterUpdate) => void;
  defaultSelectedFilterId: string;
	clearFilter: (id: string) => void;
}

const Main: React.FC<MainProps> = ({
	filters,
	onFilterChange,
	defaultSelectedFilterId,
	clearFilter,
}) => {
  const [selectedFilterId, setSelectedFilterId] = useState<string>(defaultSelectedFilterId);
	console.log('>>>received filters in main', filters);

  return (
    <View style={styles.container}>
      <Sidebar filters={filters} filterClick={setSelectedFilterId} selectedFilterId={selectedFilterId} />
      <FilterOptions filters={filters} filterId={selectedFilterId} onFilterChange={onFilterChange} clearFilter={clearFilter} />
    </View>
  );
};

export default Main;
