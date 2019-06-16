import jQuery from 'jquery';
import { IValidators } from './interfaces';

export class Validators implements IValidators {

  validateNameField(inputField: JQuery<HTMLElement>): string {
    const value = inputField.val() as string;
    if (!value.length) {
      return 'This field is required.';
    } else if (!this.alphabetValidation(value)) {
      return 'Invalid character. Only alphabet.';
    }
    return 'pass';
  }

  /**
   * @internal
   */
  private alphabetValidation(input: string): boolean {
    const regex = new RegExp('^{a-zA-Z]+$');
    return regex.test(input);
  }
}
