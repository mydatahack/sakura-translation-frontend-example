// Error messages
export const REQUIRED_FIELD_ERROR_MSG = 'This field is required.';
export const INVALID_CHARACTER_ERROR_MSG = 'Invalid character.';
export const INVALID_EMAIL_ERROR_MSG = 'Invalid Email.';
export const PASS_RETRUN_VALUE = 'pass';
export const INVALID_PHONE_ERROR_MSG = 'Invalid number.';
export const NUMBER_ONLY_ERROR_MSG = 'Number only.';

// Field types
export const TEXT_ONLY_FIELD = 'textOnlyField';
export type TEXT_ONLY_FIELD = typeof TEXT_ONLY_FIELD;
export const EMAIL_FIELD = 'emailField';
export type EMAIL_FIELD = typeof EMAIL_FIELD;
export const PHONE_NUMBER_FIELD = 'phoneNumberField';
export type PHONE_NUMBER_FIELD = typeof PHONE_NUMBER_FIELD;
export const NUMBER_ONLY_FIELD = 'numberOnlyField';
export type NUMBER_ONLY_FIELD = typeof NUMBER_ONLY_FIELD;
export const REQUIRED_ONLY_FIELD = 'requiredOnlyField';
export type REQUIRED_ONLY_FIELD = typeof REQUIRED_ONLY_FIELD;
export const RADIO_REQUIRED_FIELD = 'requiredRadioField';
export type RADIO_REQUIRED_FIELD = typeof RADIO_REQUIRED_FIELD;
export const SELECT_REQUIRED_FIELD = 'requiredSelectField';
export type SELECT_REQUIRED_FIELD = typeof SELECT_REQUIRED_FIELD;


export type FIELD_TYPE = TEXT_ONLY_FIELD
| EMAIL_FIELD
| PHONE_NUMBER_FIELD
| NUMBER_ONLY_FIELD
| REQUIRED_ONLY_FIELD
| RADIO_REQUIRED_FIELD
| SELECT_REQUIRED_FIELD;
