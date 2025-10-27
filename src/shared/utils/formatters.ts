export const formatDNI = (dni: number | string): string => {
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
