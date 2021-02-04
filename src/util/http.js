import {baseURL} from './../Constant';
import {Alert} from 'react-native';

const httpCall = {
  get: (url, payload, showLoader, callback) => {
    showLoader(true);
    fetch(baseURL + url, {
      params: payload,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        console.log('Response:' + JSON.stringify(responseData));
        callback && callback(responseData);
        showLoader(false);
      })
      .catch((error) => {
        showLoader(false);
        Alert.alert(
          'Whoops',
          'Something went wrong! Please check internet connectivity',
        );
      })
      .done();
  },
};

export default httpCall;
