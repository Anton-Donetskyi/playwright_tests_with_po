// Function to sort in ascending order for string values
export const sortAscending_A_Z = (array) => {
    return [...array].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
};

// Function to sort in descending order for string values
export const sortDescending_Z_A = (array) => {
    return [...array].sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
};

// Function to sort in ascending order for numeric values
export const sortAscending = (pricesArray) => {
    return pricesArray.sort((a, b) => a - b);
};

// Function to sort in descending order for numeric values
export const sortDescending = (pricesArray) => {
    return pricesArray.sort((a, b) => b - a);
};

