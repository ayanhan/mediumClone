import React, {useEffect, useState} from 'react';
import axios from "axios";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }

  useEffect(() => {
    if (!isLoading) {
      return
    }
    axios(url, options)
        .then(res => {
          console.log(res)
          setIsLoading(false)
          setResponse(res.data)
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          setError(error.response.data)
          alert(JSON.stringify(error.response.data))
        })
  }, [isLoading])

  return [{isLoading, response, error}, doFetch]
};

export default useFetch;
