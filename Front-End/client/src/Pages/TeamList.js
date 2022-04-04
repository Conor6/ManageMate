import React from 'react'
import {useState, useEffect} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

function TeamList() {

    const [userData, setUserData] = useState();
    const [userTeams, setUserTeams] = useState();
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    const getUserData =  async () => {
        
        const res = await fetch("http://localhost:3001/user-info",{
          method: "GET",
          headers: {token: localStorage.token}
        });
    
        const jsonData = await res.json();
        setUserData(jsonData);
    };

    const getUserTeams = async () => {

        console.log("UserID");
        console.log(userData.usr_id);

        const info = {
          usr_id: userData.usr_id,
        }
    
        const body = info;
        const res = await fetch("http://localhost:3001/getuserteams",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
    
        const jsonData = await res.json();
        let data = jsonData.rows;
   
        data = data[0].usr_teams;
        let teamsArray = []
        let i = 1;
    
        //Modify the data so that it is compatible with the Select menus
        Object.keys(data).forEach(key => {
          
          teamsArray.push({id: i, team: data[key] })
          i++;
        })

        
        setUserTeams(teamsArray);
        setLoading(false);
    }

    const navButton = (userData) => {

  
        navigate(`/teamprofile/${userData.team}`);
        
      }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {

        console.log("useEffect userData");
        console.log(userData);

        if(userData != undefined){
            getUserTeams()
        }
        console.log(userTeams);

    }, [userData]);


  return (

    <div className=" col-md-6 mx-auto text-center" id="gymProfileDiv">

        {!loading ? (
        <table className="team-table table table-bordered" variant="dark">
            <thead>
                <tr>
                <th>Team Name</th>

                </tr>
            </thead>
            <tbody>
                {userTeams.map(userTeams => (
                <tr key={userTeams.id} data-item={userTeams}>
                    <td data-title="Team-Name" key={userTeams.id} onClick={() => navButton(userTeams)}>{userTeams.team}</td>
                </tr>
                ))}
            </tbody>
            </table>
            ) : (
                <h1>Loading</h1>
            )
        }   

        
    </div>

  )
}

export default TeamList