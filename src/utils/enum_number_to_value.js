import api from "./auth_config";

/**
 * Generic function to fetch enums
 * @param {string} endpoint - The API endpoint to fetch enums from
 * @param {string} errorMessage - The error message to log if the fetch fails
 * @returns {Promise<Array>} A promise that resolves to an array of enum values
 */
async function getEnums(endpoint, errorMessage) {
    try {
        const response = await api.get(endpoint);
        return response.data.map(item => item.id);
    } catch (error) {
        console.error(errorMessage, error);
        throw error;
    }
}

export const getGenderEnums = () => 
    getEnums('/enums/gender/', 'Error fetching gender enums:');

export const getMaritalStatusEnums = () => 
    getEnums('/enums/marital-status/', 'Error fetching marital status enums:');

export const getReligionEnums = () => 
    getEnums('/enums/religions/', 'Error fetching religion enums:');

export const getEducationLevelEnums = () => 
    getEnums('/enums/education-level/', 'Error fetching education level enums:');

export const getFamilyTypeEnums = () => 
    getEnums('/enums/family-type/', 'Error fetching family type enums:');

export const getDietaryPreferenceEnums = () => 
    getEnums('/enums/dietary-preference/', 'Error fetching dietary preference enums:');

export const getSmokingHabitEnums = () => 
    getEnums('/enums/smoking-habit/', 'Error fetching smoking habit enums:');

export const getDrinkingHabitEnums = () => 
    getEnums('/enums/drinking-habit/', 'Error fetching drinking habit enums:');

export const getNationalityEnums = () => 
    getEnums('/enums/nationality/', 'Error fetching nationality enums:');

export const getCasteCommunityEnums = () => 
    getEnums('/enums/caste-community/', 'Error fetching caste/community enums:');

export const getLanguageEnums = () => 
    getEnums('/enums/language/', 'Error fetching language enums:');

export const getCollegeEnums = () => 
    getEnums('/enums/college/', 'Error fetching college enums:');

export const getProfessionEnums = () => 
    getEnums('/enums/profession/', 'Error fetching profession enums:');

export const getFamilyValueEnums = () => 
    getEnums('/enums/family-value/', 'Error fetching family value enums:');

export const getHobbyEnums = () => 
    getEnums('/enums/hobby/', 'Error fetching hobby enums:');