import { useProviders } from './useProviders';

export const useProviderByCuit = (providerCuit: number | undefined) => {
  const {
    data: providersData,
    isLoading,
    error,
  } = useProviders({
    pageIndex: 1,
    pageSize: 1000,
  });

  const provider = providersData?.data?.items?.find((p) => p.cuit === providerCuit);

  return {
    provider,
    isLoading,
    error,
    isProviderFound: !!provider,
  };
};
