import './App.css'
import { useState,useEffect, useCallback } from "react";
import covidData from './data/data.json';
import Card from "./components/SummaryCard";
import Select from 'react-select'
function App() {

  const locationList = [
    { value: "EC", label: "Eastern Cape" },
    { value: "FS", label: "Free State" },
    { value: "GP", label: "Gauteng" },
    { value: "KZN", label: "KwaZulu-Natal" },
    { value: "LP", label: "Limpopo Province" },
    { value: "MP", label: "Mpumalanga" },
    { value: "NC", label: "Northern Cape" },
    { value: "NW", label: "Northern West" },
    { value: "WC", label: "Western Cape" }
  ];

  const [activeLocation, setActiveLocation] = useState("EC");
  const [lastUpdated, setlastUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});
 
  const getVersion = async () => {
    try {
      // Simulating a version update from data.json
      setlastUpdated("2024-02-06");
    } catch (error) {
      console.error("Error fetching version data:", error);
    }
  };
  const getSummaryData = useCallback(() => {
    try {
      if (activeLocation === "SA") {
        return;
      }

      const summaryD = covidData[activeLocation];
      
      setSummaryData(summaryD);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  }, [activeLocation]);
  
  useEffect(() => {
    const fetchData = async () => {
      getVersion();
    };
    getSummaryData();
    fetchData();
    
  }, [getSummaryData,activeLocation]);

  return (
    <>
    
      <div className="app-container">
        <h1>COVID-19 Dashboard</h1>
        <div className="dashboard-container">

          <div className="dashboard-menu">
            <Select
              options={locationList}
              onChange={(selectedOption) => setActiveLocation(selectedOption.value)}
              defaultValue={locationList.filter(
                (options) => options.value === activeLocation
              )}
              className="dashboard-select"
            />

            <p className="update-date">Last Updated : {lastUpdated}</p>
          </div>

          <div className="dashboard-summary">
          <Card title="Total Cases" value={summaryData.totalCases} />
          <Card title="Total Tests" value={summaryData.totalTests} />
          <Card title="Total Deaths" value={summaryData.totalDeaths} />
          <Card title="Total Vaccinated" value={summaryData.totalVaccinated} />	
          </div>
        </div>

      </div>
    </>
  )
}

export default App
