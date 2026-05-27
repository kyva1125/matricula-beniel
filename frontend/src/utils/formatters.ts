/**
 * Formatea una fecha ISO o tipo Date a un string legible
 */
export function formatDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return '-';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  if (isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

/**
 * Formatea un valor numérico a divisa (EUR / USD / CLP, etc.)
 */
export function formatCurrency(value: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(value);
}
