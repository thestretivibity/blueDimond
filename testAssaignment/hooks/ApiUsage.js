import {useState} from 'react';

export default function useApi(apiFunc, query, page = -1) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async () => {
    setLoading(true);
    const response =
      page > -1 ? await apiFunc(query, page) : await apiFunc(query);
    if (response.status != 200) {
      //  console.log(response);
      setLoading(false);
      return setError(true);
    }
    console.log(response.data.results);
    setError(false);
    setData(response.data);
    setLoading(false);
  };
  return {data, error, loading, request};
}
