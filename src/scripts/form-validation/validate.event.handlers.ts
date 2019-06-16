import { Validators } from './validators';
import { IValidators } from './interfaces';
import jQuery from 'jquery';

export namespace validation {

  export class ValidationEventHandler {

    validators: IValidators;

    constructor() {
      this.validators = new Validators();
    }

    init(): void {
      jQuery('form').submit((e): void => {
        this.nameFieldValidationHandler($(e.currentTarget), 'firstname', e);
        this.nameFieldValidationHandler($(e.currentTarget), 'lastname', e);
      });
    }

    /**
     * @internal
     */
    private nameFieldValidationHandler (element: JQuery<HTMLElement>, inputId: string, event: JQuery.SubmitEvent): boolean {
      const targetElement = element.find(`#${inputId}`);
      const message = this.validators.validateNameField(targetElement);
      if (message !== 'pass') {
        if (!$(`#${inputId}-error`).length) {
          $(`<span class="form-error-message" id="${inputId}-error">${message}</span>`).insertBefore(targetElement);
        }
        event.preventDefault();
        return false;
      }
      return true;
    }

  }
}
