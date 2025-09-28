import { Control } from "react-hook-form";
import { FormTextField } from "@/shared/components/FormTextField";
import { CreateProviderFormData } from "@/features/provider/schemas/createProviderSchema";

interface CreateProviderFormFieldsProps {
    control: Control<CreateProviderFormData>;
}

export default function CreateProviderFormFields({
  control,
}: CreateProviderFormFieldsProps) {
  return (
    <>
      <FormTextField name='cuit' control={control} label='CUIT *' type='number' />

      <FormTextField name='firstName' control={control} label='Nombre *' />

      <FormTextField name='address' control={control} label='Dirección' />
      <FormTextField name='description' control={control} label='Descripción' />
    </>
  );
}