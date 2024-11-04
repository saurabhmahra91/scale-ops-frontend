export default function validateForm(formData) {
    let newErrors = {};
    if (formData.name.trim() === '') {
        newErrors.name = 'Name cannot be empty';
    }
    if (formData.bio.trim() === '') {
        newErrors.bio = 'User bio cannot be empty';
    }
    return newErrors;
};