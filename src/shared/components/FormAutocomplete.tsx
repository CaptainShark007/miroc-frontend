import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { useDebounce } from '@shared/hooks/useDebounce';
import AxiosClient from '@app/axios';

export interface AutocompleteOption {
  id: string;
  label: string;
  value: string | number;
  extraData?: any;
}

interface EntityConfig {
  endpoint: string;
  idField: string;
  labelFields: string[];
  searchParam?: string;
  customFetch?: (searchQuery: string) => Promise<any>;
  customMapper?: (item: any) => AutocompleteOption;
}

interface FormAutocompleteProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  entityConfig: EntityConfig;
  disabled?: boolean;
  required?: boolean;
  minSearchLength?: number;
  debounceTime?: number;
  onValueChange?: (value: string | number | null) => void;
  onCreateNew?: () => void;
  createNewLabel?: string;
  createNavigationPath?: string;
  renderOptionContent?: (option: AutocompleteOption) => ReactNode;
}

export const FormAutocomplete = <T extends FieldValues>({
  name,
  control,
  label,
  entityConfig,
  disabled = false,
  required = false,
  minSearchLength = 0,
  debounceTime = 500,
  onValueChange,
  onCreateNew,
  createNewLabel = 'Crear nuevo',
  createNavigationPath,
  renderOptionContent,
}: FormAutocompleteProps<T>) => {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchQuery, debounceTime);

  useEffect(() => {
    if ((onCreateNew || createNavigationPath) && options.length === 0) {
      const CREATE_NEW_OPTION: AutocompleteOption = {
        id: '__CREATE_NEW__',
        label: `+ ${createNewLabel}`,
        value: '__CREATE_NEW__',
      };
      setOptions([CREATE_NEW_OPTION]);
    }
  }, [onCreateNew, createNavigationPath, createNewLabel, options.length]);

  useEffect(() => {
    const fetchOptions = async () => {
      const CREATE_NEW_OPTION: AutocompleteOption | null =
        onCreateNew || createNavigationPath
          ? {
              id: '__CREATE_NEW__',
              label: `+ ${createNewLabel}`,
              value: '__CREATE_NEW__',
            }
          : null;

      if (debouncedSearch.length < minSearchLength) {
        if (CREATE_NEW_OPTION) {
          setOptions([CREATE_NEW_OPTION]);
        } else {
          setOptions([]);
        }
        return;
      }

      setLoading(true);
      try {
        let items: any[] = [];

        if (entityConfig.customFetch) {
          const response = await entityConfig.customFetch(debouncedSearch);
          items = Array.isArray(response.data)
            ? response.data
            : response.data?.items || response.items || [];
        } else {
          const queryParams = new URLSearchParams();
          queryParams.set('pageIndex', '1');
          queryParams.set('pageSize', '50');

          if (debouncedSearch && entityConfig.searchParam) {
            queryParams.set(entityConfig.searchParam, debouncedSearch);
          }

          const response: any = await AxiosClient.get(
            `${entityConfig.endpoint}?${queryParams.toString()}`
          );

          items = response.data?.items || response.items || [];
        }

        const mappedOptions: AutocompleteOption[] = entityConfig.customMapper
          ? items.map(entityConfig.customMapper)
          : items.map((item: any, index: number) => ({
              id: `${entityConfig.idField}-${item[entityConfig.idField]}-${index}`,
              label: entityConfig.labelFields
                .map((field) => item[field])
                .filter(Boolean)
                .join(' '),
              value: item[entityConfig.idField],
            }));

        if (CREATE_NEW_OPTION) {
          setOptions([...mappedOptions, CREATE_NEW_OPTION]);
        } else {
          setOptions(mappedOptions);
        }
      } catch (error) {
        console.error(`Error fetching options:`, error);
        if (CREATE_NEW_OPTION) {
          setOptions([CREATE_NEW_OPTION]);
        } else {
          setOptions([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [
    debouncedSearch,
    entityConfig,
    minSearchLength,
    onCreateNew,
    createNewLabel,
    createNavigationPath,
  ]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption =
          options.find((opt) => String(opt.value) === String(field.value)) ||
          null;

        return (
          <Autocomplete
            value={selectedOption}
            onChange={(_, newValue) => {
              if (newValue && newValue.value === '__CREATE_NEW__') {
                if (createNavigationPath) {
                  navigate(createNavigationPath);
                } else if (onCreateNew) {
                  onCreateNew();
                }
                return;
              }

              const newVal = newValue ? String(newValue.value) : null;
              field.onChange(newVal);
              if (onValueChange) {
                onValueChange(newVal);
              }
            }}
            onInputChange={(_, newInputValue) => {
              setSearchQuery(newInputValue);
            }}
            onOpen={() => {
              if (
                (onCreateNew || createNavigationPath) &&
                options.length === 0
              ) {
                const CREATE_NEW_OPTION: AutocompleteOption = {
                  id: '__CREATE_NEW__',
                  label: `+ ${createNewLabel}`,
                  value: '__CREATE_NEW__',
                };
                setOptions([CREATE_NEW_OPTION]);
              }
            }}
            options={options}
            getOptionKey={(option) => option.id}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              String(option.value) === String(value.value)
            }
            loading={loading}
            disabled={disabled}
            filterOptions={(opts) => opts}
            noOptionsText={
              minSearchLength > 0 && searchQuery.length < minSearchLength
                ? `Escribe al menos ${minSearchLength} ${minSearchLength === 1 ? 'carácter' : 'caracteres'} para buscar`
                : 'No se encontraron resultados'
            }
            renderOption={(props, option) => {
              if (option.value === '__CREATE_NEW__') {
                return (
                  <li
                    {...props}
                    key={option.id}
                    style={{
                      fontWeight: 600,
                      color: '#1976d2',
                    }}
                  >
                    {option.label}
                  </li>
                );
              }
              if (renderOptionContent) {
                return (
                  <li {...props} key={option.id}>
                    {renderOptionContent(option)}
                  </li>
                );
              }
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                required={required}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      fontWeight: 600,
                    },
                  },
                }}
              />
            )}
          />
        );
      }}
    />
  );
};
