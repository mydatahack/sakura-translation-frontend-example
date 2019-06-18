(function (exports, jQuery) {
  'use strict';

  jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;

  var Validators = (function () {
      function Validators() {
      }
      Validators.prototype.validateNameField = function (inputField) {
          var value = inputField.val();
          console.log(value);
          if (!value.length) {
              return 'This field is required.';
          }
          else if (!this.alphabetValidation(value)) {
              return 'Invalid character.';
          }
          return 'pass';
      };
      Validators.prototype.alphabetValidation = function (input) {
          var regex = new RegExp('^[a-zA-Z]+$');
          console.log('alchabetValidation', regex.test(input));
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
                  _this.nameFieldValidationHandler($(e.currentTarget), 'firstname', e);
                  _this.nameFieldValidationHandler($(e.currentTarget), 'lastname', e);
              });
              jQuery("input[type='text']").keydown(function (e) {
                  if ($(e.currentTarget).attr('id') === 'firstname') {
                      _this.nameFieldChangeHandler($('form'), $(e.currentTarget), 'firstname');
                  }
                  else if ($(e.currentTarget).attr('id') === 'lastname') {
                      _this.nameFieldChangeHandler($('form'), $(e.currentTarget), 'lastname');
                  }
              });
          };
          ValidationEventHandler.prototype.nameFieldValidationHandler = function (element, inputId, event) {
              var targetElement = element.find("#" + inputId);
              var message = this.validators.validateNameField(targetElement);
              if (message !== 'pass') {
                  if (!jQuery("#" + inputId + "-error").length) {
                      jQuery("<span class=\"form-error-message\" id=\"" + inputId + "-error\">" + message + "</span>").insertBefore(targetElement);
                  }
                  event.preventDefault();
                  return false;
              }
              return true;
          };
          ValidationEventHandler.prototype.nameFieldChangeHandler = function ($currentForm, $targetInput, inputId) {
              var targetElement = $currentForm.find("#" + inputId + "-error");
              if (targetElement.length) {
                  targetElement.remove();
              }
          };
          return ValidationEventHandler;
      }());
      validation.ValidationEventHandler = ValidationEventHandler;
  })(exports.validation || (exports.validation = {}));

}(this.sakura = this.sakura || {}, jQuery));
