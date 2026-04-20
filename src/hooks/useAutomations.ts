import { useState, useEffect } from 'react';
import { getAutomations } from '../services/api';

export const useAutomations = () => {
  const [data, setData] = useState<{id: string, label: string}[]>([]);

  useEffect(() => {
    getAutomations().then(setData);
  }, []);

  return data;
};
