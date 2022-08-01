// Capitalizes a string
const capitalize = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

// Returns a pluralized statement based on a number and the string
const pluralized = (number, string) => `${number} ${Math.abs(number) === 1 ? string : string + "s"}`;

export {
    capitalize,
    pluralized
}