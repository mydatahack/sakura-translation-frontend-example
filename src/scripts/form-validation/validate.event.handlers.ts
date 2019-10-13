import { Validators } from './validators';
import { IValidators } from './interfaces';
import * as constants from './constants';
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

        if (jQuery(e.currentTarget).find('#firstname').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'firstname', e);
        }

        if (jQuery(e.currentTarget).find('#lastname').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'lastname', e);
        }

        if (jQuery(e.currentTarget).find('#email').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'email', e);
        }

        if (jQuery(e.currentTarget).find('#mobile').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'mobile', e);
        }

        if (jQuery(e.currentTarget).find('#wordcount').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'wordcount', e);
        }

        if (jQuery(e.currentTarget).find('#message').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'message', e);
        }

        if (jQuery(e.currentTarget).find('#username').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'username', e);
        }

        if (jQuery(e.currentTarget).find('#password').length) {
          this.inputFieldValidationHandler(jQuery(e.currentTarget), 'password', e);
        }

        if (jQuery(e.currentTarget).find('input[type="radio"]').length) {
          this.radioInputValidator(jQuery(e.currentTarget), e);
        }

        if (jQuery(e.currentTarget).find('select').length) {
          this.selectInputValidator(jQuery(e.currentTarget), e, 'select');
        }

        if (jQuery(e.currentTarget).find('input[type="date"]').length) {
          this.selectInputValidator(jQuery(e.currentTarget), e, 'date');
        }

      });

      jQuery("input[type='text'], input[type='email'], input[type='tel'], textarea, input[type='password']").on('keypress change', (e) => {
        if (jQuery(e.currentTarget).attr('id') === 'firstname') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'firstname');
        } else if (jQuery(e.currentTarget).attr('id') === 'lastname') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'lastname');
        } else if (jQuery(e.currentTarget).attr('id') === 'email') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'email');
        } else if (jQuery(e.currentTarget).attr('id') === 'mobile') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'mobile');
        } else if (jQuery(e.currentTarget).attr('id') === 'wordcount') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'wordcount');
        } else if (jQuery(e.currentTarget).attr('id') === 'message') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'message');
        } else if (jQuery(e.currentTarget).attr('id') === 'username') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'username');
        } else if (jQuery(e.currentTarget).attr('id') === 'password') {
          this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'password');
        }
      });

      jQuery('input[type="radio"], select, input[type="date"]').click((e) => {
        this.inputClickChangeHandler(jQuery(e.currentTarget));
      } );
    }

    public inputFieldValidationHandler (
      element: JQuery<HTMLElement>,
      inputId: string,
      event: JQuery.SubmitEvent
      ): boolean {
      const targetElement = element.find(`#${inputId}`);
      // Getting validation message according to the id and field type
      const message = this.getValidationMsg(targetElement, inputId);
      // Inject error message to dom if validation error exists
      return this.errorMsgGenerator(inputId, message, event, targetElement);
    }

    public getValidationMsg(
      targetElement: JQuery<HTMLElement>,
      inputId: string
    ): string {
      switch (inputId) {
        case 'firstname' :
        case 'lastname' :
          return this.validators.validateField(targetElement, constants.TEXT_ONLY_FIELD);
        case 'email':
          return this.validators.validateField(targetElement, constants.EMAIL_FIELD);
        case 'mobile' :
        case 'phone' :
          return this.validators.validateField(targetElement, constants.PHONE_NUMBER_FIELD);
        case 'wordcount':
          return this.validators.validateField(targetElement, constants.NUMBER_ONLY_FIELD);
        case 'message' :
        case 'username' :
        case 'password' :
            return this.validators.validateField(targetElement, constants.REQUIRED_ONLY_FIELD);
        default:
          return 'pass';
      }
    }

    public errorMsgGenerator (
      inputId: string,
      message: string,
      event: JQuery.SubmitEvent,
      targetElement: JQuery<HTMLElement>
      ): boolean {
      if (message !== 'pass') {
        if (!jQuery(`#${inputId}-error`).length) {
          jQuery(`<span class="form-error-message" id="${inputId}-error">${message}</span>`).insertBefore(targetElement);
        }
        event.preventDefault();
        return false;
      }
      return true;
    }

    public radioInputValidator (formElement: JQuery<HTMLElement>, event: JQuery.SubmitEvent): void {
      let errorMsgTargetElemArray: JQuery<HTMLElement>[] = [];
      const radioInputElements = formElement.find('.radio-input-group');
      radioInputElements.each((index) => {
        const radioValue = jQuery(radioInputElements[index]).find('input[type="radio"]:checked').val();

        if (typeof radioValue === 'undefined') {
          console.log('checking errorMsgTargetElemArray element', radioInputElements[index]);
          errorMsgTargetElemArray.push(jQuery(radioInputElements[index]));
        }
      });
      if (errorMsgTargetElemArray.length > 0) {
        event.preventDefault();
      }
      this.radioErrorMsgGenerator(errorMsgTargetElemArray);
    }

    public radioErrorMsgGenerator (errorMsgTargetElemArray: JQuery<HTMLElement>[]): void {
        errorMsgTargetElemArray.forEach((elem: JQuery<HTMLElement>, index: number) => {
        if (errorMsgTargetElemArray.length) {
          if (!elem.find('.form-error-message').length) {
            jQuery(`<span class="form-error-message" id="radio${index}-error">${constants.REQUIRED_FIELD_ERROR_MSG}</span>`)
            .insertAfter(elem.find('.required-field'));
          }
        }
      });
    }


    // Todo: currently required select field is only 1 per form. Update for multiple select inputs support
    public selectInputValidator (formElement: JQuery<HTMLElement>, event: JQuery.SubmitEvent, fieldType: string): void {
      let selectElement: JQuery<HTMLElement> = jQuery('<div></div>');
      if (fieldType === 'select') {
        selectElement = formElement.find('select');
      } else if (fieldType === 'date') {
        selectElement = formElement.find('input[type="date"]');
      }
      const selectContainer = selectElement.closest('.form-group');

      console.log(`checking selected value for ${fieldType} input`, selectElement.val());
      if (selectElement.val() === '') {
        if (!selectContainer.find('.form-error-message').length) {
          jQuery(`<span class="form-error-message" id="${fieldType}-error">${constants.REQUIRED_FIELD_ERROR_MSG}</span>`)
              .insertAfter(selectContainer.find('.required-field'));
        }
        event.preventDefault();
      }
    }

    public inputFieldChangeHandler ($currentForm: JQuery < HTMLElement > , $targetInput: JQuery < HTMLElement > , inputId: string): void {
        const targetElement = $currentForm.find(`#${inputId}-error`);
        if (targetElement.length) {
          targetElement.remove();
        }
    }

    public inputClickChangeHandler( $targetInput: JQuery<HTMLElement>): void {
      const parentContainer = $targetInput.closest('.form-group');
      const targetErrorMsg = parentContainer.find('span');
      if (targetErrorMsg.length) {
        targetErrorMsg.remove();
      }
    }
  }
}
