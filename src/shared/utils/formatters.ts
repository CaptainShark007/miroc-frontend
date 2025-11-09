export const formatDNI = (dni?: number | string): string => {
  if (dni === undefined || dni === null) return '';
  const dniString = dni.toString();
  return dniString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatCUIT = (cuit: number | string): string => {
  const cuitString = cuit.toString().replace(/\D/g, '');
  if (cuitString.length !== 11) {
    return cuitString;
  }
  return `${cuitString.slice(0, 2)}-${cuitString.slice(2, 10)}-${cuitString.slice(10)}`;
};

export const formatNumber = (num: number | string): string => {
  const numString = num.toString();
  return numString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatDateToInput = (date?: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateToDisplay = (date?: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
