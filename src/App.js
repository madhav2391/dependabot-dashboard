import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
// import { fetchAlerts } from './services/DependabotApi';
import axios from "./common/config/AxiosConfig";

function App() {
    const [apiData, setApiData] = useState([]);

     const fetchAlerts = () => {
        console.log("heli");
            console.log("ji");

            axios
                .get("/orgs/mosip-intern/dependabot/alerts") 
                .then((res) => {
                    // if (!res.data) { throw new Error("No alerts found"); }
                    console.log("-----then------", res);
                    setApiData(res.data)
                })
                .catch((err) => {
                    console.log("-----this is catch------", err);
                })

        
    }


    useEffect(()=>{
        fetchAlerts();
        console.log("asfd");
    },[])

    const columns = [
        { label: "summary",name:" summary", options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = apiData[dataIndex].security_advisory.summary;
            return val;
          } } 
        },
        {name:"state",label:"state",        
        options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = apiData[dataIndex].state;
            return val;
          } } 
        },
        
        {label:"severity ",name:"severity",options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = apiData[dataIndex].security_advisory.severity;
            return val;
          } } },
        {label:"created_at ",name:"created_at",options: { filterOptions: { fullWidth: true } ,
          customBodyRenderLite: (dataIndex) => {
              let val = apiData[dataIndex].created_at;
              return val;
            } } },
        {name:"repository",label:" repository",        
        options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
          const val = apiData[dataIndex].repository.name;
          return val;
          } } 
        },
        {name: "Open in gitHub",
        options: { filterOptions: {  fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = apiData[dataIndex].html_url;
            console.log(val);
            return (<>
                <Button size="small" variant="contained"    onClick={() => {
            window.open(
                val, "_blank");
                    }}>gitHub</Button>
            </>
            )
          } } 

        }
    ];
    const options = {
        search: true,
        download: false,
        print: false,
        viewColumns: true,
        filter: true,
        filterType: "dropdown",
        responsive:"standard",
        selectableRows:"none",
      };


  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter /> */}

    <MUIDataTable
    title={"Dependabot Alerts"}
    data={apiData}
    columns={columns}
    options={options}
    />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
