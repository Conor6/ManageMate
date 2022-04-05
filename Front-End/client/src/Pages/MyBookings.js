import React from 'react'
import {useState, useEffect} from 'react';
import { Container, Row, Table } from "react-bootstrap";

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
        console.log(jsonData.rows)
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
        <Table>

        </Table>

    </Container>
  )
}

export default MyBookings