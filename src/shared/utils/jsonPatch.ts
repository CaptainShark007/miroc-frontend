import { JsonPatchOp } from '@shared/types/json';

/**
 * Convierte un string de camelCase a PascalCase
 * @param str - String en camelCase
 * @returns String en PascalCase
 */
const toPascalCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Crea operaciones JSON Patch comparando un objeto original con uno actualizado
 * @param original - Objeto con los valores originales
 * @param updated - Objeto con los valores actualizados
 * @param excludeFields - Array de campos que se deben excluir de la comparación
 * @param usePascalCase - Si true, convierte los paths a PascalCase (para APIs que lo requieren)
 * @returns Array de operaciones JSON Patch
 */
export const createPatchOperations = <T extends Record<string, any>>(
  original: T,
  updated: T,
  excludeFields: string[] = [],
  usePascalCase: boolean = false
): JsonPatchOp[] => {
  const operations: JsonPatchOp[] = [];

  Object.keys(updated).forEach((key) => {
    // Saltar campos excluidos
    if (excludeFields.includes(key)) return;

    const originalValue = original[key];
    const updatedValue = updated[key];

    // Lógica especial para password: solo incluir si no está vacío
    if (key === 'password' && (!updatedValue || updatedValue.trim() === '')) {
      return;
    }

    // Comparar valores usando JSON.stringify para manejar objetos anidados
    if (JSON.stringify(originalValue) !== JSON.stringify(updatedValue)) {
      const path = usePascalCase ? `/${toPascalCase(key)}` : `/${key}`;
      operations.push({
        op: 'replace',
        path,
        value: updatedValue,
      });
    }
  });

  return operations;
};

/**
 * Crea una operación JSON Patch individual
 * @param operation - Tipo de operación ('add', 'remove', 'replace', etc.)
 * @param path - Ruta del campo (ej: '/email', '/user/name')
 * @param value - Valor a asignar (opcional según el tipo de operación)
 * @returns Operación JSON Patch
 */
export const createPatchOperation = (
  operation: JsonPatchOp['op'],
  path: string,
  value?: any
): JsonPatchOp => {
  const op: JsonPatchOp = { op: operation, path };
  if (value !== undefined) {
    op.value = value;
  }
  return op;
};

/**
 * Valida si hay cambios entre dos objetos
 * @param original - Objeto original
 * @param updated - Objeto actualizado
 * @param excludeFields - Campos a excluir de la validación
 * @param usePascalCase - Si true, convierte los paths a PascalCase
 * @returns true si hay cambios, false si no
 */
export const hasChanges = <T extends Record<string, any>>(
  original: T,
  updated: T,
  excludeFields: string[] = [],
  usePascalCase: boolean = false
): boolean => {
  return (
    createPatchOperations(original, updated, excludeFields, usePascalCase)
      .length > 0
  );
};
