import { Validators } from './validators';
import { IValidators } from './interfaces';
import jQuery from 'jquery';

export namespace validation {

  export class ValidationEventHandler {

    validators: IValidators;

    $formHost: JQuery<HTMLElement>;

    constructor() {
      this.validators = new Validators();
    }

    init(): void {

      jQuery('form').submit((e): void => {
        this.nameFieldValidationHandler($(e.currentTarget), 'firstname', e);
        this.nameFieldValidationHandler($(e.currentTarget), 'lastname', e);
        // $(e.currentTarget).unbind(e);
      });

      jQuery("input[type='text']").keydown((e) => {
        if ($(e.currentTarget).attr('id') === 'firstname') {
          this.nameFieldChangeHandler($('form'), $(e.currentTarget), 'firstname');
        } else if ($(e.currentTarget).attr('id') === 'lastname') {
          this.nameFieldChangeHandler($('form'), $(e.currentTarget), 'lastname');
        }
      });
    }

    /**
     * @internal
     */
    private nameFieldValidationHandler (element: JQuery<HTMLElement>, inputId: string, event: JQuery.SubmitEvent): boolean {
      const targetElement = element.find(`#${inputId}`);
      const message = this.validators.validateNameField(targetElement);
      if (message !== 'pass') {
        if (!jQuery(`#${inputId}-error`).length) {
          jQuery(`<span class="form-error-message" id="${inputId}-error">${message}</span>`).insertBefore(targetElement);
        }
        event.preventDefault();
        return false;
      }
      return true;
    }

    /**
     * @internal
     */
    private nameFieldChangeHandler ($currentForm: JQuery<HTMLElement>, $targetInput: JQuery<HTMLElement>, inputId: string): void {

        const targetElement = $currentForm.find(`#${inputId}-error`);
        if (targetElement.length) {
          targetElement.remove();
        }
    }
  }
}
