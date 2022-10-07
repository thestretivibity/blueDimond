import {useState} from 'react';
import {_refreshToken} from '../redux/actions/authenticationAction';
import Toast from 'react-native-toast-message';

export default function useApi(apiFunc, query, page = -1) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMeassage] = useState('');

  const request = async () => {
    setLoading(true);
    setError(false);
    const response = await apiFunc(query, page);
    if (response?.status != 200) {
      setErrorMeassage(response?.data?.message);
      showToast('Alert', response?.data?.message || 'Network Error', 'error');
      setError(true);
      setLoading(false);
      return;
    }
    setError(false);
    setData(response?.data);
    setLoading(false);
  };
  return {data, error, loading, request, errorMessage};
}

const showToast = (title, message, type) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
  });
};
