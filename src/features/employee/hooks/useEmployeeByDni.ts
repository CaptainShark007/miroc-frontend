import { useQuery } from '@tanstack/react-query';
import { getEmployeeByDni } from '@features/employee/api/service';
import { GetEmployeeResponse } from '@features/employee/types';

export const useEmployeeByDni = (dni: string | undefined) => {
  const dniNumber = dni ? parseInt(dni, 10) : undefined;

  return useQuery<GetEmployeeResponse>({
    queryKey: ['employee', dniNumber],
    queryFn: () => getEmployeeByDni(dniNumber!),
    enabled: !!dniNumber && !isNaN(dniNumber),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
