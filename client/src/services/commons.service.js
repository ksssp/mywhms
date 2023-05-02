import { DateTime } from 'luxon';

export function formatDate(anyDate) {
    return DateTime.fromISO(anyDate).toFormat('dd-MM-yyyy');
}

export function formatNumber(anyNumber) {
    return (new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Math.round(anyNumber)));
}