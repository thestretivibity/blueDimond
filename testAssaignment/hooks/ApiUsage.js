import {useState} from 'react';
import {_refreshToken} from '../redux/actions/authenticationAction';

export default function useApi(apiFunc, query, page = -1) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async () => {
    setLoading(true);
    const response =
      page > -1 ? await apiFunc(query, page) : await apiFunc(query);
    if (response?.status > 200) {
      setLoading(false);
      setError(true);
      return;
    }
    setError(false);
    setData(response?.data);
    setLoading(false);
  };
  return {data, error, loading, request};
}
