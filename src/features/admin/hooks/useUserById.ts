import { useUsers } from './useUsers';

export const useUserById = (userDni: string | undefined) => {
  const {
    data: usersData,
    isLoading,
    error,
  } = useUsers({
    pageIndex: 1,
    pageSize: 1000,
  });

  const user = usersData?.data?.items?.find((u) => u.dni.toString() === userDni);

  return {
    user,
    isLoading,
    error,
    isUserFound: !!user,
  };
};
