import api from "./auth_config";

/**
 * Formats an enum string to title case with spaces
 * @param {string} enumString - The enum string to format (e.g., "NEVER_MARRIED")
 * @returns {string} The formatted string (e.g., "Never Married")
 */
export function formatEnumString(enumString) {
    return enumString
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Generic function to fetch and format enums
 * @param {string} endpoint - The API endpoint to fetch enums from
 * @param {string} errorMessage - The error message to log if the fetch fails
 * @returns {Promise<Array>} A promise that resolves to an array of formatted enums
 */
async function getFormattedEnums(endpoint, errorMessage) {
    try {
        const response = await api.get(endpoint);
        return response.data.map(item => ({
            name: formatEnumString(item.name),
            value: item.value
        }));
    } catch (error) {
        console.error(errorMessage, error);
        throw error;
    }
}

export const getFormattedMaritalStatusEnums = () => 
    getFormattedEnums('/enums/marital-status', 'Error fetching marital status enums:');

export const getFormattedReligionEnums = () => 
    getFormattedEnums('/enums/religions', 'Error fetching religion enums:');

export const getFormattedGenderEnums = () => 
    getFormattedEnums('/enums/genders', 'Error fetching gender enums:');

export const getFormattedEducationLevelEnums = () => 
    getFormattedEnums('/enums/education-levels', 'Error fetching education level enums:');

export const getFormattedFamilyTypeEnums = () => 
    getFormattedEnums('/enums/family-types', 'Error fetching family type enums:');

export const getFormattedDietaryPreferenceEnums = () => 
    getFormattedEnums('/enums/dietary-preferences', 'Error fetching dietary preference enums:');

export const getFormattedSmokingHabitEnums = () => 
    getFormattedEnums('/enums/smoking-habits', 'Error fetching smoking habit enums:');

export const getFormattedDrinkingHabitEnums = () => 
    getFormattedEnums('/enums/drinking-habits', 'Error fetching drinking habit enums:');

export const getFormattedNationalityEnums = () => 
    getFormattedEnums('/enums/nationalities', 'Error fetching nationality enums:');


