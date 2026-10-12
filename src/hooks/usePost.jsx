import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const usePost = (id) => {
  const axiosPublic = useAxiosPublic();

  const { data: post = {}, isLoading, refetch } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/posts/${id}`);
      return res.data;
    },
    enabled: !!id, 
  });

  return [post, isLoading, refetch];
};

export default usePost;