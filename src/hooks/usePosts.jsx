import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePosts = () => {
  const axiosPublic = useAxiosPublic();

  // useQuery er maddhome data fetch, cache ebong manage hobe
  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/posts');
      return res.data;
    }
  });

  return [posts, isLoading, refetch];
};

export default usePosts;