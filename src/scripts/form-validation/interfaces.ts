import { FIELD_TYPE } from './constants';
export interface IValidators {
  validateNameField(inputField: JQuery<HTMLElement>): string;
  validateField(inputField: JQuery<HTMLElement>, fieldType: FIELD_TYPE): string;
}
