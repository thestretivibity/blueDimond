import {useState} from 'react';

export default function useApi(apiFunc, query) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async () => {
    setLoading(true);
    const response = await apiFunc(query);
    if (response.status != 200) {
      console.log(response);
      setLoading(false);
      return setError(true);
    }
    //console.log(response.data.response.docs);
    setError(false);
    setData(response.data);
    setLoading(false);
  };
  return {data, error, loading, request};
}
