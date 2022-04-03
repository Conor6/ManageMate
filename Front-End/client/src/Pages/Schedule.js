import { useEffect, useState, useCallback} from "react";
import {useNavigate, useParams } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, Toolbar, DateNavigator, TodayButton, ViewSwitcher, MonthView, EditRecurrenceMenu, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { colors, formControlLabelClasses, } from "@mui/material";


function Schedule(props) {

  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("Week");
  const [gyms, setGyms] = useState();
  const [userData, setUserData] = useState();
  const [teams, setTeams] = useState();

  const ages = [{id: 1, text:"Academy"}, {id: 2, text:"U11"},{id: 3, text:"U12"},{id: 4, text:"U13"},{id: 5, text:"U14"},{id: 6, text:"U15"},
    {id: 7, text:"U16"},{id: 8, text:"U17"},{id: 9, text:"U18"},{id: 10, text:"U19"},{id: 11, text:"U20"},{id: 12, text:"Division 1"},
    {id: 13, text:"Divison 3"},{id: 14, text:"Divison 5"},{id: 15, text:"National League"},{id: 16, text:"Super League"},
  ];

  const activities = [{id: 1, text:"Training"}, {id:2, text:"Match"}, {id: 3, text: "Scrimmage"}, {id: 4, text: "Skills Session"}, {id:5, text: "Other"}];


  const Label = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.text === 'Details') {
      return <AppointmentForm.Label text="Create Booking:" type="title"/> 
    } 
    if (props.text === 'More Information') {
      return null;
    } return <AppointmentForm.Label {...props} />;
  };

  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'titleTextEditor') {
      return null;
    } 
    if (props.type === 'multilineTextEditor') {
      return null;
    } return <AppointmentForm.TextEditor {...props} />;
  };

  const Select = (props) => {
    // eslint-disable-next-line react/destructuring-assignment

    if (props.type === 'multilineTextEditor') {
      return null;
    } return <AppointmentForm.Select {...props} />;
  };
  
  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onActivityChange = (nextValue) => {
      onFieldChange({ activity: nextValue });
    };

    const onGymChange = (nextValue) => {
      onFieldChange({ gym: nextValue });
    };

    const onTeamChange = (nextValue) => {
      onFieldChange({ team: nextValue });
    };
  
    if(appointmentData.activity === undefined){
      appointmentData.activity = 1;
    }

    if(appointmentData.gym === undefined){
      appointmentData.gym = 1;
    }

    if(appointmentData.team === undefined){
      appointmentData.team = 1;
    }

    return (

      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label
          text="Activity"
          type="title"
        />
        <AppointmentForm.Select
          onValueChange={onActivityChange}
          value={appointmentData.activity}
          availableOptions={activities}
          type="outlinedSelect"
        />

        <AppointmentForm.Label
          text="Gym"
          type="title"
        />
        <AppointmentForm.Select
          onValueChange={onGymChange}
          value={appointmentData.gym}
          availableOptions={gyms}
          type="outlinedSelect"
        />

        <AppointmentForm.Label
          text="Team"
          type="title"
        />

        <AppointmentForm.Select
          onValueChange={onTeamChange}
          value={appointmentData.team}
          availableOptions={teams}
          type="outlinedSelect"
        />

      </AppointmentForm.BasicLayout>

    
    );
  };

  //Function which is used to changed the data displayed on screen depending on what view is being displayed
  const currentViewNameChange = (currentViewName) =>{

    setCurrentViewName(currentViewName)
  }

  const getUserData =  async () => {
        
    const res = await fetch("http://localhost:3001/user-info",{
      method: "GET",
      headers: {token: localStorage.token}
    });

    const jsonData = await res.json();
    setUserData(jsonData);


  };

  const getUserTeams = async () => {
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
      
      teamsArray.push({id: i, text: data[key] })
      i++;
    })
    setTeams(teamsArray);
  }

  const getAppointments =  async () => {
        
    const res = await fetch("http://localhost:3001/getappointments",{
      method: "GET",
      headers: {token: localStorage.token}
    });

    const jsonData = await res.json();
    let apps = jsonData.rows;
    setData(apps);
  };

  const getGyms =  async () => {
        
    const res = await fetch("http://localhost:3001/getgyms",{
      method: "GET",
      headers: {token: localStorage.token}
    });

    const jsonData = await res.json();
    let apps = jsonData.rows;

    let data = []
    let i =1;

    Object.keys(apps).forEach(key => {
      
      data.push({id: i, text: apps[key].gym_name })
      i++;
    })
    setGyms(data);
  };

  useEffect(() => {

    getAppointments();
    getGyms();
    getUserData();

  }, []);

  useEffect(() => {
    console.log(userData);
    if(userData != undefined){
      
      getUserTeams()
    }

  }, [userData]);


  const commitChanges = ({added, changed, deleted}) => {

    setData( ()=>{

      if(added){

        if(added.activity === undefined){
          added.activity = 1;
        }
    
        if(added.gym === undefined){
          added.gym = 1;
        }

        if(added.team === undefined){
          added.team = 1;
        }

        console.log("added activity+gym")
        console.log(added.gym);
        console.log(added.activity);
        console.log(added.team);

        if(added.activity && added.gym && added.team != undefined){
          added.activity = activities[added.activity-1].text;
          added.gym = gyms[added.gym-1].text;
          added.team = teams[added.team-1].text;
          
        }

        const startingAddedId = data.length > 0 ? data[data.length -1].id +1 : 0;
        let booking = [...data, { id: startingAddedId, ...added }]

        booking[startingAddedId].title = booking[startingAddedId].gym + ": " + booking[startingAddedId].team + " - " + booking[startingAddedId].activity; 

        const addBooking = async (booking, startingAddedId) => {
          
          const data = {
            id: booking[startingAddedId].id,
            title: booking[startingAddedId].title,
            start_date: booking[startingAddedId].startDate,
            end_date: booking[startingAddedId].endDate,
            rRule: booking[startingAddedId].rRule,
            usr_id: userData.usr_id,
            activity: booking[startingAddedId].activity,
            gym: booking[startingAddedId].gym,
            team: booking[startingAddedId].team
            
          };

          let body = data;
          const response = await fetch("http://localhost:3001/appointment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
        
        }
        addBooking(booking, startingAddedId);
        setData(booking);
      }

      if(changed){

        const updateApp = async (apps)=> {

          const data = {
            id: apps.id,
            title: apps.title,
            startDate: apps.startDate,
            endDate: apps.endDate,
            rRule: apps.rRule,
            usr_id: userData.usr_id,
            activity: apps.activity,
            gym: apps.gym,
            team: apps.team,
            
          };

          let body = data;
          const response = await fetch("http://localhost:3001/update-appointment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
        }

        let changedApp = data.find(appointment => (changed[appointment.id]));
        let changedId = changedApp.id;

        if(changed[changedId].activity && changed[changedId].gym && changed[changedId].team != undefined){

          //Set activity to text version
          if(typeof changed[changedId].activity === "number"){

            changed[changedId].activity = activities[changed[changedId].activity-1].text;
          }

          //Set gym to text version
          if(typeof changed[changedId].gym === "number"){

            changed[changedId].gym = gyms[changed[changedId].gym-1].text;
          }

          if(typeof changed[changedId].team === "number"){

            changed[changedId].team = teams[changed[changedId].team-1].text;
          }

          //Set title
          changed[changedId].title = changed[changedId].gym + ": " + changed[changedId].team + " - " + changed[changedId].activity;
        }

        let apps = data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

        //Call function to update the appointment in the database
        updateApp(apps[changedId]);

        setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment))
        );

      }

      if(deleted !== undefined){

        let app = deleted;

        const deleteApp = async (app)=> {

          const data = {
            id: app,
          };

          let body = data;
          const response = await fetch("http://localhost:3001/delete-appointment", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
        }
        deleteApp(app);
        setData(data.filter(appointment => appointment.id !== deleted));
      }
      return { data };
    })
  }
  return (
    <Container>
      <Paper>
        <Scheduler data={data} height={700} >

          <ViewState 
            currentViewName={currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />
          <EditingState onCommitChanges={commitChanges}/>
          <DayView startDayHour={9} endDayHour={23} />
          <WeekView startDayHour={17} endDayHour={23} />

          <MonthView/>
          <Toolbar />
          <ViewSwitcher/>
          <DateNavigator />
          <TodayButton />
          <IntegratedEditing/>
          <ConfirmationDialog />
          <Appointments/>
          <AppointmentTooltip showOpenButton showDeleteButton />

          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            selectComponent={Select}
            textEditorComponent={TextEditor}
            labelComponent={Label}
          />

        </Scheduler>
      </Paper>
      
    </Container>
  );
}

export default Schedule;