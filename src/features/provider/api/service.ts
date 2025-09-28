import AxiosClient from "@app/axios"; 

import {
	GetProvidersResponse,
	CreateProviderRequest,
	CreateProviderResponse,
	GetProviderRequest,
	UpdateProviderRequest,
	UpdateProviderResponse,
	DeleteProviderResponse
} from '@features/provider/types';

export const getProviders = async (
	data: GetProviderRequest
): Promise<GetProvidersResponse> => {
	const response = await AxiosClient.get<GetProvidersResponse>(
		`/api/v1/providers?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`
	);
	return response
}

export const createProvider = async (
	data: CreateProviderRequest
): Promise<CreateProviderResponse> => {
	const response = await AxiosClient.post<CreateProviderResponse>(
		`/api/v1/providers`,
		data
	);
	return response;
}

export const updateProvider = async (
	providerDni: number,
	data: UpdateProviderRequest
): Promise<UpdateProviderResponse> => {
	const response = await AxiosClient.put<UpdateProviderResponse>(
		`/api/v1/providers/${providerDni}`,
		data
	);
	return response;
}

export const deleteProvider = async (data: number): Promise<DeleteProviderResponse> => {
	const response = await AxiosClient.delete<DeleteProviderResponse>(
		`/api/v1/providers/${data}`
	);
	return response;
}
