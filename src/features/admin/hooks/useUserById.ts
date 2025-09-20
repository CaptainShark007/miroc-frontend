import { useUsers } from './useUsers';

export const useUserById = (userId: string | undefined) => {
  const {
    data: usersData,
    isLoading,
    error,
  } = useUsers({
    pageIndex: 1,
    pageSize: 1000,
  });

  const user = usersData?.data?.items?.find((u) => u.id === userId);

  return {
    user,
    isLoading,
    error,
    isUserFound: !!user,
  };
};
