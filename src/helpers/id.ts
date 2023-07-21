export const generateId = (): string => (Date.now() + Math.round(Math.random() * 100000)).toString();
