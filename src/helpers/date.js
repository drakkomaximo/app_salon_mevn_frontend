import { parse, formatISO, parseISO, format } from 'date-fns';

export const convertToISO = (strDate) => {
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date());
    return formatISO(newDate);
}

export const displayDate = (strDate) => {
    const newDate = parseISO(strDate);
    return format(newDate, 'PPPP');
};

export function convertToDDMMYYYY(isoDate) {
    const newDate = new Date(isoDate);
    return format(newDate, 'dd/MM/yyyy');
}