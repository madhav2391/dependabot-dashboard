import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
// import { fetchAlerts } from './services/DependabotApi';
import axios from "./common/config/AxiosConfig";
import { Stack, TextField, ButtonGroup } from '@mui/material'
import { Box, Grid, Paper } from '@mui/material'

function App() {
    const [apiData, setApiData] = useState([]);
    const [refinedData,setRefinedData] = useState([]);
     const fetchAlerts = () => {
        console.log("heli");
            console.log("ji");
            const oorg = localStorage.getItem("org");
            axios
                .get("/orgs/"+oorg+"/dependabot/alerts") 
                .then((res) => {
                    // if (!res.data) { throw new Error("No alerts found"); }
                    console.log("-----then------", res);
                    setApiData(res.data)
                })
                .catch((err) => {
                    console.log("-----this is catch------", err);
                })

        
    }


    const [value, setValue] = useState('');
    const [org,setOrg] = useState('');
    const handleChange = (event) => {
      setValue(event.target.value)
    }
    const handleOrgChange = (event) => {
        setOrg(event.target.value)
      }
    useEffect(()=>{
        fetchAlerts();
        console.log("asfd");
    },[])
    useEffect(()=>{
        let data=[];
        console.log("adfasdfasdf234234",apiData);
        for (const element of apiData) {
            data.push({summary:element.security_advisory.summary,state:element.state,severity:element.security_advisory.severity,created_at:element.created_at,repository:element.repository.name,html_url:element.html_url,ecosystem:element.dependency.package.ecosystem})
        }
        setRefinedData(data);
    },[apiData])
    const columns = [
        { label: "summary",name:" summary", options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = refinedData[dataIndex].summary;
            return val;
          } } 
        },
        {name:"state",label:"state",        
        options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = refinedData[dataIndex].state;
            return val;
          } } 
        },
        
        {label:"severity ",name:"severity",options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = refinedData[dataIndex].severity;
            return val;
          } } },
        {label:"created_at ",name:"created_at",options: { filterOptions: { fullWidth: true } ,
          customBodyRenderLite: (dataIndex) => {
              let val = refinedData[dataIndex].created_at;
              return val;
            } } },
        {name:"repository",label:"repository",        
        options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
          const val = refinedData[dataIndex].repository;
          return val;
          } } 
        },
        {name:"ecosystem",label:"ecosystem",        
        options: { filterOptions: { fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
          const val = refinedData[dataIndex].ecosystem;
          return val;
          } } 
        },
        {name: "Open in gitHub",
        options: { filterOptions: {  fullWidth: true } ,
        customBodyRenderLite: (dataIndex) => {
            let val = refinedData[dataIndex].html_url;
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

    <Paper sx={{ padding: '16px' }} elevation={2}>
 
      <Grid rowSpacing={2} columnSpacing={1} container my={4}>
        <Grid item xs={6}>
            <TextField
                    label='Org name'
                    required
                    error={!org}
                    value={org}
                    fullWidth
                    onChange={handleOrgChange}
                    />
        </Grid>
        <Grid item xs={6}>
            <TextField  
                label='Personal acess token'
                required
                helperText={
                    !value ? 'Required' : 'Do not share your token with anyone'
                }
                type='password'
                error={!value}
                value={value}
                onChange={handleChange}
                fullWidth
            />        
        </Grid>
        <Grid item xs={12}>

                <Button  variant="contained"    onClick={() => {
                        localStorage.setItem("org",org);
                        localStorage.setItem("token",value);
                        window.location.reload();

                    }}>submit</Button>

                <Button  variant="contained"    onClick={() => {
                        localStorage.removeItem("org");
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}>LogOut</Button>            

        </Grid>
      </Grid>
    </Paper>

        <MUIDataTable
        title={"Dependabot Alerts"}
        data={refinedData}
        columns={columns}
        options={options}
        />
        
    </div>
  );
}

export default App;
