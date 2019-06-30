import { IValidators } from './interfaces';
import * as constants from './constants';

export class Validators implements IValidators {


  public requiredFeildValidation(inputField: JQuery<HTMLElement>): string {
    if (!(inputField.val() as string).length) {
      return constants.REQUIRED_FIELD_ERROR_MSG;
    } else {
      return constants.PASS_RETRUN_VALUE;
    }
  }

  public validateNameField(inputField: JQuery<HTMLElement>): string {
    const value = inputField.val() as string;
    if (!value.length) {
      return constants.REQUIRED_FIELD_ERROR_MSG;
    } else if (!this.alphabetValidation(value)) {
      return constants.INVALID_CHARACTER_ERROR_MSG;
    }
    return constants.PASS_RETRUN_VALUE;
  }

  public validateEmailField(inputField: JQuery<HTMLElement>): string {
    const value = inputField.val() as string;
    if (!value.length) {
      return constants.REQUIRED_FIELD_ERROR_MSG;
    } else if (!this.emailValidation(value)) {
      return constants.INVALID_EMAIL_ERROR_MSG;
    }
    return constants.PASS_RETRUN_VALUE;
  }

  public validatePhoneField(inputField: JQuery<HTMLElement>): string {
    const value = inputField.val() as string;
    if (!value.length) {
      return constants.REQUIRED_FIELD_ERROR_MSG;
    } else if (!this.phoneValidation(value)) {
      return constants.INVALID_PHONE_ERROR_MSG;
    }
    return constants.PASS_RETRUN_VALUE;
  }

  public validateNumberOnlyField(inputField: JQuery<HTMLElement>): string {
    const value = inputField.val() as string;
    if (!value.length) {
      return constants.REQUIRED_FIELD_ERROR_MSG;
    } else if (!this.numberValidation(value)) {
      return constants.NUMBER_ONLY_ERROR_MSG;
    }
    return constants.PASS_RETRUN_VALUE;
  }

  public validateField(inputField: JQuery<HTMLElement>, fieldType: constants.FIELD_TYPE): string {
    switch (fieldType) {

      case constants.TEXT_ONLY_FIELD:
        return this.validateNameField(inputField);

      case constants.EMAIL_FIELD:
        return this.validateEmailField(inputField);

      case constants.PHONE_NUMBER_FIELD:
        return this.validateNumberOnlyField(inputField);

      case constants.NUMBER_ONLY_FIELD:
        return this.validateNumberOnlyField(inputField);

      case constants.REQUIRED_ONLY_FIELD:
        return this.requiredFeildValidation(inputField);

      default:
        return 'default';
    }
  }

  /**
   * @internal
   */
  private alphabetValidation(input: string): boolean {
    const regex = new RegExp('^[a-zA-Z]+$');
    return regex.test(input);
  }

  /**
   * @internal
   */
  private emailValidation(input: string): boolean {
    const regex = new RegExp('^.+[@].+[.][a-zA-Z]+$');
    return regex.test(input);
  }

  /**
   * @internal
   * Matching 10 digit number only for Australian number
   */
  private phoneValidation(input: string): boolean {
    const regex = new RegExp('^[0-9]{10}$');
    return regex.test(input);
  }

  /**
   * @internal
   * only number
   */
  private numberValidation(input: string): boolean {
    const regex = new RegExp('^[0-9]+$');
    return regex.test(input);
  }



}
