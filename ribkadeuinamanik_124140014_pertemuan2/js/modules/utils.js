// Utility functions dengan Arrow Functions dan ES6 Features

// Arrow Function 1: Format tanggal Indonesia
export const formatDate = (isoString) => {
    if (!isoString) return "";
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(isoString).toLocaleDateString('id-ID', options);
};

// Arrow Function 2: Capitalize Teks
export const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);