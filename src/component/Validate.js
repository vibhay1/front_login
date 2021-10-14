const validateFunc = {
  email: (n, v, r) => {
    if (v.length > 0) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(v).toLowerCase()) ? null : `Invalid ${n}`;
    }else if (v === "" && !r) return null;
    else return `${n} is required`
  },
  text: (n, v, r) => {
    if (v === "" && r === true) return `${n} is required`;
    if (v.length > 0) {
      const re = /^[a-zA-Z0-9. ]{2,}$/;
      return re.test(String(v).toLowerCase()) ? null : `Invalid ${n} `;
    }
  },

  textarea: (n, v, r) => {
    if (v === "" && r === true) return `${n} is required.`;
    if (v.length < 5) {
      return `Invalid ${n} minimum 5 characters.`;
    } else
      return null;


  },
  tel: (n, v, r) => {
    if (v.length > 0) {
      const re = /^\d{10}$/;
      return re.test(String(v).toLowerCase()) ? null : `Invalid ${n} `;
    } else if (v === "" && !r) return null;
    else return `${n} is required`
  },
  password: (n, v, r) => {
    if (v.length > 0) {
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return re.test(String(v).toLowerCase()) ? null : `Invalid ${n} should be min 6 to 16  characters included one numeric value and special character (!,@,#,$,%,^,&,*)`;
    } else if (v === "" && !r) return null;
    else return `${n} is required`

  }

}

export const FormValidate = (data) => {
  return validateFunc[data['type']](data['fieldName'], data['value'], data['value'], data['required']);

};



