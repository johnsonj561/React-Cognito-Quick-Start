const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const telephoneRegex = /^\d{3}[\s-.]?\d{3}[\s-.]?\d{4}$/;


export default {
  getValidationError: {
    name: (value) => {
      const isValid = !!value.length;
      return (isValid) ? '' : 'Name required';
    },
    email: (value) => {
      const isValid = !!value.match(emailRegex);
      return (isValid) ? '' : 'Invalid email';
    },
    telephone: (value) => {
      const isValid = !!value.match(telephoneRegex);
      return (isValid) ? '' : 'Invalid phone number';
    },
    password: (value) => {
      const isValid = !!value.length;
      return (isValid) ? '' : 'Password required';
    },
    password2: (value) => {
      const isValid = !!value.length;
      return (isValid) ? '' : 'Password required';
    },
    confirmationCode: (value) => {
      const isValid = !!value.length;
      return (isValid) ? '' : 'Code required';
    }
  }
};
