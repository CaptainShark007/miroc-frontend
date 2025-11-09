export type ConstructionStatus = 
  | 'planned'      // Planificada - aún no comenzó
  | 'in-progress'  // En Progreso - obra activa
  | 'ending-soon'  // Próxima a Finalizar - faltan menos de 7 días
  | 'finished';    // Finalizada - pasó la fecha de fin

export interface ConstructionStatusConfig {
  status: ConstructionStatus;
  label: string;
  color: string;
  bgColor: string;
}

export const getConstructionStatus = (
  startDate: string,
  endDate: string
): ConstructionStatusConfig => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  // Obra finalizada
  if (now > end) {
    return {
      status: 'finished',
      label: 'Finalizada',
      color: '#d32f2f',
      bgColor: '#ffebee',
    };
  }

  // Obra planificada (aún no comenzó)
  if (now < start) {
    return {
      status: 'planned',
      label: 'Planificada',
      color: '#1976d2',
      bgColor: '#e3f2fd',
    };
  }

  // Calcular días restantes
  const daysRemaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Próxima a finalizar (menos de 7 días)
  if (daysRemaining <= 7) {
    return {
      status: 'ending-soon',
      label: 'Próxima a Finalizar',
      color: '#ed6c02',
      bgColor: '#fff4e5',
    };
  }

  // En progreso
  return {
    status: 'in-progress',
    label: 'En Progreso',
    color: '#2e7d32',
    bgColor: '#e8f5e9',
  };
};
