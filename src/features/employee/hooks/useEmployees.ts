import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '@features/employee/api/service';
import {
  GetEmployeesRequest,
  GetEmployeesResponse,
} from '@features/employee/types';

export const useEmployees = (params: GetEmployeesRequest) => {
  return useQuery<GetEmployeesResponse>({
    queryKey: [
      'employees',
      params.pageIndex,
      params.pageSize,
      params.q,
      params.fDni,
      params.fFirstName,
      params.fLastName,
      params.fWorkStation,
      params.sort,
    ],
    queryFn: () => getEmployees(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
