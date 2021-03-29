export const checkValidation = (value, rules) => {
  let valid = true;

  if (!rules) return true;

  if (rules.required) {
    valid = value.trim() !== '' && valid;
  }

  if (rules.length) {
    valid = value.length >= rules.length.minLength && value.length <= rules.length.maxLength && valid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    valid = pattern.test(value) && valid;
  }

  return valid;
};
