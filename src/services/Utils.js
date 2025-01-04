function flattenErrors(obj, parentKey = '', result = {}) {
    for (const key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key; // Concatenate keys for nested structure

        if (Array.isArray(obj[key])) {
            // If the value is an array, join the messages and set them
            result[newKey] = obj[key].join(', ');
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // If the value is an object, recursively flatten it
            flattenErrors(obj[key], newKey, result);
        } else {
            // If it's a primitive (not expected in this case), set it directly
            result[newKey] = obj[key];
        }
    }
    return result;
}

const toPersianDigits = (number) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(number)
        .split('')
        .map(digit => persianDigits[parseInt(digit, 10)] || digit)
        .join('');
};

function formatPrice(price) {
    const number = parseFloat(price);

    if (Number.isInteger(number)) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return number.toFixed(2).replace(/\.00$/, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function getFormattedPrice(price) {
    const formattedPrice = formatPrice(price); // Format the price with commas
    return toPersianDigits(formattedPrice); // Convert digits to Persian
}

// Export all functions as named exports
export { getFormattedPrice, toPersianDigits, flattenErrors };
