import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const App = () => {
  const [product, setproduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products/").then((response) => {
      setproduct(response.data.product);
      console.log(response.data.product);
    });
  }, []);

  return <></>;
};

export default App;
