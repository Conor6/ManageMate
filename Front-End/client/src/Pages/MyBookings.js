import React from 'react'
import {useState, useEffect} from 'react';
import { Container, Row, Table } from "react-bootstrap";
import '../CSS/MyBookings.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function MyBookings() {

    const [userData, setUserData] = useState();
    const [userApps, setUserApps] = useState();
    const [loading, setLoading] = useState(true);

    const getUserInfo =  async () => {
        
        const res = await fetch("http://localhost:3001/user-info",{
          method: "GET",
          headers: {token: localStorage.token}
        });
    
        const jsonData = await res.json();
        setUserData(jsonData);
    };

    const getUserApps = async () => {
        const data = {
          usr_id: userData.usr_id,
        }
      
        const body = data;
        const res =  await fetch("http://localhost:3001/get-user-apps",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        })
  
        const jsonData = await res.json();
        setUserApps(jsonData.rows)
        setLoading(false);
    }

    useEffect(() => {
        getUserInfo();

    }, []);

    useEffect(() => {
        if(userData !== undefined) {
            getUserApps();
        }
    }, [userData]);
  
  return (
    <Container>

        {!loading ? (
            <>
                <h1 className='title'>My Bookings</h1>
                <Table className='appsTable' striped bordered>
                    <thead>
                        <tr>
                            <th>Booking Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userApps.map(userApps => (
                            <tr key={userApps.gym_id} data-item={userApps}>
                                <td data-title="App-Name" key={userApps.id}>{userApps.title}</td>
                                <td data-title="App-Time">{userApps.startDate}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </>) 
            : (
                <Box sx={{ display: 'flex', justifyContent: 'center', size: 25}}>
                    <CircularProgress />
                </Box>
            )   
        }
    </Container>
  )
}

export default MyBookings