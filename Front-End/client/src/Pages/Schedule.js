import { useEffect, useState, useCallback} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, Toolbar, DateNavigator, TodayButton, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { colors, formControlLabelClasses, } from "@mui/material";


function Schedule() {

  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState(appointments);

  const getAppointments =  async () => {
        
    console.log("ran");
    
    const res = await fetch("http://localhost:3001/getappointments",{

      method: "GET",
      headers: {token: localStorage.token}

    });

    const jsonData = await res.json();
    let apps = jsonData.rows;

    setData(apps);

  };


  useEffect(() => {

    getAppointments();


  }, []);

  const commitChanges = ({added, changed, deleted}) => {

    setData( ()=>{

      if(added){

        const startingAddedId = data.length > 0 ? data[data.length -1].id +1 : 0;
        //data = [...data, { id: startingAddedId, ...added }];
        let booking = [...data, { id: startingAddedId, ...added }]

        const addBooking = async (booking, startingAddedId) => {
          
          const data = {
        
            id: booking[startingAddedId].id,
            title: booking[startingAddedId].title,
            start_date: booking[startingAddedId].startDate,
            end_date: booking[startingAddedId].endDate,
      
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

          };

          console.log(data);

          let body = data;

          const response = await fetch("http://localhost:3001/update-appointment", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)

          });

          console.log("Test");

        }
        
        setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

        
        let changedApp = data.find(appointment => (changed[appointment.id]));
        let changedId = changedApp.id;

        let apps = data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        console.log(apps[changedId]);

        updateApp(apps[changedId]);
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
    <Container fluid>
      <Paper>
        <Scheduler
          data={data}
          height={650}
        >
          <ViewState
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={commitChanges}
            
          />
          <IntegratedEditing />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />

          <WeekView
            startDayHour={10}
            endDayHour={23}
          />

          <Toolbar />
          <DateNavigator />
          <TodayButton />

          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
      
    </Container>
  );
}

export default Schedule;