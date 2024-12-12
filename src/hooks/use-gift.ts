import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

export interface Game {
  name: string;
  code: string;
}

export interface GiftReponse {
  name?: string;
  message?: string;
  games: Game[];
}

const useGift = () => {
  const [idParam] = useQueryState('id');
  const id = useMemo(() => (idParam === '0' ? '00000000-0000-0000-0000-000000000000' : idParam), [idParam]);
  const { data } = useQuery({
    queryKey: [],
    queryFn: () => fetch(`/api/games?id=${id || ''}`).then(res => res.json() as Promise<GiftReponse>),
    initialData: { games: [] },
    enabled: Boolean(id)
  });

  return data;
};

export default useGift;
