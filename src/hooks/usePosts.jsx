import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePosts = () => {
  const axiosPublic = useAxiosPublic();

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