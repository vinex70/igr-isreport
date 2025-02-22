export const FormatNumbers = (value: number | string, options?: Intl.NumberFormatOptions) => {
    const numberValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numberValue)) return "-"; // Handle invalid numbers

    return new Intl.NumberFormat("en-US", { ...options, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(numberValue);
};

export const FormatPercentage = (value: number | string, options?: Intl.NumberFormatOptions) => {
    const numberValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numberValue)) return "-"; // Handle invalid numbers

    return new Intl.NumberFormat("en-US", { ...options, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numberValue);
};

// export const FormatNumber = (value: number | string, options?: Intl.NumberFormatOptions) => {
//     const numberValue = +value;
//     return isNaN(numberValue) ? "-" : new Intl.NumberFormat("en-US", options).format(numberValue);
// };