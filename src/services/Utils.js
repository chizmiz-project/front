import { FlashOnTwoTone } from "@mui/icons-material";

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

export default flattenErrors;