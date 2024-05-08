const axios = require('axios');

const FormUrl = 'https://docs.google.com/forms/u/0/d/e/';

export function postResponse(formCode, data){
    const url = FormUrl + formCode + '/formResponse';

    return axios.post(url, data, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
}).then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
};

