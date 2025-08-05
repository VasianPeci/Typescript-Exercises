"use strict";
function validateField(field) {
    const errors = [];
    switch (field.type) {
        case 'text':
            if (field.required && field.value.trim() === '') {
                errors.push(`${field.label} is required.`);
            }
            if (field.minLength !== undefined && field.value.length < field.minLength) {
                errors.push(`${field.label} must be at least ${field.minLength} characters.`);
            }
            if (field.maxLength !== undefined && field.value.length > field.maxLength) {
                errors.push(`${field.label} must be at most ${field.maxLength} characters.`);
            }
            break;
        case 'checkbox':
            if (!field.checked) {
                errors.push(`You must check ${field.label}.`);
            }
            break;
        case 'select':
            if (field.required && (!field.selected || !field.options.includes(field.selected))) {
                errors.push(`Please select a valid option for ${field.label}.`);
            }
            break;
        default:
            errors.push('Unknown field type.');
    }
    return errors;
}
function validateForm(form) {
    const result = {};
    for (const key in form) {
        const field = form[key];
        const fieldErrors = validateField(field);
        if (fieldErrors.length > 0) {
            result[key] = fieldErrors;
        }
    }
    return result;
}
