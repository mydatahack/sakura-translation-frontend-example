(function (exports, jQuery) {
  'use strict';

  jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;

  var REQUIRED_FIELD_ERROR_MSG = 'This field is required.';
  var INVALID_CHARACTER_ERROR_MSG = 'Invalid character.';
  var INVALID_EMAIL_ERROR_MSG = 'Invalid Email.';
  var PASS_RETRUN_VALUE = 'pass';
  var INVALID_PHONE_ERROR_MSG = 'Invalid number.';
  var NUMBER_ONLY_ERROR_MSG = 'Number only.';
  var TEXT_ONLY_FIELD = 'textOnlyField';
  var EMAIL_FIELD = 'emailField';
  var PHONE_NUMBER_FIELD = 'phoneNumberField';
  var NUMBER_ONLY_FIELD = 'numberOnlyField';
  var REQUIRED_ONLY_FIELD = 'requiredOnlyField';

  var Validators = (function () {
      function Validators() {
      }
      Validators.prototype.requiredFeildValidation = function (inputField) {
          if (!inputField.val().length) {
              return REQUIRED_FIELD_ERROR_MSG;
          }
          else {
              return PASS_RETRUN_VALUE;
          }
      };
      Validators.prototype.validateNameField = function (inputField) {
          var value = inputField.val();
          if (!value.length) {
              return REQUIRED_FIELD_ERROR_MSG;
          }
          else if (!this.alphabetValidation(value)) {
              return INVALID_CHARACTER_ERROR_MSG;
          }
          return PASS_RETRUN_VALUE;
      };
      Validators.prototype.validateEmailField = function (inputField) {
          var value = inputField.val();
          if (!value.length) {
              return REQUIRED_FIELD_ERROR_MSG;
          }
          else if (!this.emailValidation(value)) {
              return INVALID_EMAIL_ERROR_MSG;
          }
          return PASS_RETRUN_VALUE;
      };
      Validators.prototype.validatePhoneField = function (inputField) {
          var value = inputField.val();
          if (!value.length) {
              return REQUIRED_FIELD_ERROR_MSG;
          }
          else if (!this.phoneValidation(value)) {
              return INVALID_PHONE_ERROR_MSG;
          }
          return PASS_RETRUN_VALUE;
      };
      Validators.prototype.validateNumberOnlyField = function (inputField) {
          var value = inputField.val();
          if (!value.length) {
              return REQUIRED_FIELD_ERROR_MSG;
          }
          else if (!this.numberValidation(value)) {
              return NUMBER_ONLY_ERROR_MSG;
          }
          return PASS_RETRUN_VALUE;
      };
      Validators.prototype.validateField = function (inputField, fieldType) {
          switch (fieldType) {
              case TEXT_ONLY_FIELD:
                  return this.validateNameField(inputField);
              case EMAIL_FIELD:
                  return this.validateEmailField(inputField);
              case PHONE_NUMBER_FIELD:
                  return this.validateNumberOnlyField(inputField);
              case NUMBER_ONLY_FIELD:
                  return this.validateNumberOnlyField(inputField);
              case REQUIRED_ONLY_FIELD:
                  return this.requiredFeildValidation(inputField);
              default:
                  return 'default';
          }
      };
      Validators.prototype.alphabetValidation = function (input) {
          var regex = new RegExp('^[a-zA-Z]+$');
          return regex.test(input);
      };
      Validators.prototype.emailValidation = function (input) {
          var regex = new RegExp('^.+[@].+[.][a-zA-Z]+$');
          return regex.test(input);
      };
      Validators.prototype.phoneValidation = function (input) {
          var regex = new RegExp('^[0-9]{10}$');
          return regex.test(input);
      };
      Validators.prototype.numberValidation = function (input) {
          var regex = new RegExp('^[0-9]+$');
          return regex.test(input);
      };
      return Validators;
  }());

  (function (validation) {
      var ValidationEventHandler = (function () {
          function ValidationEventHandler() {
              this.validators = new Validators();
          }
          ValidationEventHandler.prototype.init = function () {
              var _this = this;
              jQuery('form').submit(function (e) {
                  if (jQuery(e.currentTarget).find('#firstname').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'firstname', e);
                  }
                  if (jQuery(e.currentTarget).find('#lastname').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'lastname', e);
                  }
                  if (jQuery(e.currentTarget).find('#email').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'email', e);
                  }
                  if (jQuery(e.currentTarget).find('#mobile').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'mobile', e);
                  }
                  if (jQuery(e.currentTarget).find('#wordcount').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'wordcount', e);
                  }
                  if (jQuery(e.currentTarget).find('#message').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'message', e);
                  }
                  if (jQuery(e.currentTarget).find('#username').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'username', e);
                  }
                  if (jQuery(e.currentTarget).find('#password').length) {
                      _this.inputFieldValidationHandler(jQuery(e.currentTarget), 'password', e);
                  }
                  if (jQuery(e.currentTarget).find('input[type="radio"]').length) {
                      _this.radioInputValidator(jQuery(e.currentTarget), e);
                  }
                  if (jQuery(e.currentTarget).find('select').length) {
                      _this.selectInputValidator(jQuery(e.currentTarget), e, 'select');
                  }
                  if (jQuery(e.currentTarget).find('input[type="date"]').length) {
                      _this.selectInputValidator(jQuery(e.currentTarget), e, 'date');
                  }
              });
              jQuery("input[type='text'], input[type='email'], input[type='tel'], textarea, input[type='password']").keypress(function (e) {
                  if (jQuery(e.currentTarget).attr('id') === 'firstname') {
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'firstname');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'lastname') {
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'lastname');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'email') {
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'email');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'mobile') {
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'mobile');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'wordcount') {
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'wordcount');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'message') {
                      console.log('keypress event on message field');
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'message');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'username') {
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'username');
                  }
                  else if (jQuery(e.currentTarget).attr('id') === 'password') {
                      console.log('keypress event on password field');
                      _this.inputFieldChangeHandler(jQuery('form'), jQuery(e.currentTarget), 'password');
                  }
              });
              jQuery('input[type="radio"], select, input[type="date"]').click(function (e) {
                  _this.inputClickChangeHandler(jQuery(e.currentTarget));
              });
          };
          ValidationEventHandler.prototype.inputFieldValidationHandler = function (element, inputId, event) {
              var targetElement = element.find("#" + inputId);
              var message = this.getValidationMsg(targetElement, inputId);
              return this.errorMsgGenerator(inputId, message, event, targetElement);
          };
          ValidationEventHandler.prototype.getValidationMsg = function (targetElement, inputId) {
              switch (inputId) {
                  case 'firstname':
                  case 'lastname':
                      return this.validators.validateField(targetElement, TEXT_ONLY_FIELD);
                  case 'email':
                      return this.validators.validateField(targetElement, EMAIL_FIELD);
                  case 'mobile':
                  case 'phone':
                      return this.validators.validateField(targetElement, PHONE_NUMBER_FIELD);
                  case 'wordcount':
                      return this.validators.validateField(targetElement, NUMBER_ONLY_FIELD);
                  case 'message':
                  case 'username':
                  case 'password':
                      return this.validators.validateField(targetElement, REQUIRED_ONLY_FIELD);
                  default:
                      return 'pass';
              }
          };
          ValidationEventHandler.prototype.errorMsgGenerator = function (inputId, message, event, targetElement) {
              if (message !== 'pass') {
                  if (!jQuery("#" + inputId + "-error").length) {
                      jQuery("<span class=\"form-error-message\" id=\"" + inputId + "-error\">" + message + "</span>").insertBefore(targetElement);
                  }
                  event.preventDefault();
                  return false;
              }
              return true;
          };
          ValidationEventHandler.prototype.radioInputValidator = function (formElement, event) {
              var errorMsgTargetElemArray = [];
              var radioInputElements = formElement.find('.radio-input-group');
              radioInputElements.each(function (index) {
                  var radioValue = jQuery(radioInputElements[index]).find('input[type="radio"]:checked').val();
                  if (typeof radioValue === 'undefined') {
                      console.log('checking errorMsgTargetElemArray element', radioInputElements[index]);
                      errorMsgTargetElemArray.push(jQuery(radioInputElements[index]));
                  }
              });
              if (errorMsgTargetElemArray.length > 0) {
                  event.preventDefault();
              }
              this.radioErrorMsgGenerator(errorMsgTargetElemArray);
          };
          ValidationEventHandler.prototype.radioErrorMsgGenerator = function (errorMsgTargetElemArray) {
              errorMsgTargetElemArray.forEach(function (elem, index) {
                  if (errorMsgTargetElemArray.length) {
                      if (!elem.find('.form-error-message').length) {
                          jQuery("<span class=\"form-error-message\" id=\"radio" + index + "-error\">" + REQUIRED_FIELD_ERROR_MSG + "</span>")
                              .insertAfter(elem.find('.required-field'));
                      }
                  }
              });
          };
          ValidationEventHandler.prototype.selectInputValidator = function (formElement, event, fieldType) {
              var selectElement = jQuery('<div></div>');
              if (fieldType === 'select') {
                  selectElement = formElement.find('select');
              }
              else if (fieldType === 'date') {
                  selectElement = formElement.find('input[type="date"]');
              }
              var selectContainer = selectElement.closest('.form-group');
              console.log("checking selected value for " + fieldType + " input", selectElement.val());
              if (selectElement.val() === '') {
                  if (!selectContainer.find('.form-error-message').length) {
                      jQuery("<span class=\"form-error-message\" id=\"" + fieldType + "-error\">" + REQUIRED_FIELD_ERROR_MSG + "</span>")
                          .insertAfter(selectContainer.find('.required-field'));
                  }
                  event.preventDefault();
              }
          };
          ValidationEventHandler.prototype.inputFieldChangeHandler = function ($currentForm, $targetInput, inputId) {
              var targetElement = $currentForm.find("#" + inputId + "-error");
              if (targetElement.length) {
                  targetElement.remove();
              }
          };
          ValidationEventHandler.prototype.inputClickChangeHandler = function ($targetInput) {
              var parentContainer = $targetInput.closest('.form-group');
              var targetErrorMsg = parentContainer.find('span');
              if (targetErrorMsg.length) {
                  targetErrorMsg.remove();
              }
          };
          return ValidationEventHandler;
      }());
      validation.ValidationEventHandler = ValidationEventHandler;
  })(exports.validation || (exports.validation = {}));

}(this.sakura = this.sakura || {}, jQuery));
