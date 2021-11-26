import {ChangeEvent, useState} from 'react';

export function useFilter(): [string, (newFilter: ChangeEvent<any>) => void] {
  const [filter, setFilter] = useState('');

  const onChange = (newFilter: ChangeEvent<any>) => {
    const newValue = newFilter.target.value.toLowerCase();
    setFilter(newValue);
  };

  return [filter, onChange];
}
