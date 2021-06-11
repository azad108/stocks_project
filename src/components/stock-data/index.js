import React, {useState,useEffect} from "react";
import "./index.css";


const url = 'https://jsonmock.hackerrank.com/api/stocks?date='


export default function StockData() {
  const [date, setDate] = useState('')
  const [result, setResult] = useState(null)


  async function fetchData() {
    await fetch(url+date).then(response => {
      return response.json()
    }).then(data => {
      setResult(data)
    }).catch(error => {
      setResult(null);
    });
  }
  useEffect(() => {
    fetchData();
  }, []); 
  function handleChange(e) {
    setDate(e.target.value);
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" onChange={handleChange}/>
        <button className="" id="submit-button" data-testid="submit-button" onClick={fetchData}>Search</button>
      </section>
      {(result && result.total !== 0) && 
        (
          <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          <li className="py-10">Open: {result.data[0].open}</li>
          <li className="py-10">Close: {result.data[0].close}</li>
          <li className="py-10">High: {result.data[0].high}</li>
          <li className="py-10">Low: {result.data[0].low}</li>
          </ul>
          
        )
      }
      {!(result && result.total !== 0) && 
      (
        <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found</div>
        )
      }
    </div>
  );
}
