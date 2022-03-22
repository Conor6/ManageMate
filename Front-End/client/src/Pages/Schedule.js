import { useEffect, useState, useCallback} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, Toolbar, DateNavigator, TodayButton, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { formControlLabelClasses, } from "@mui/material";


function Schedule() {

 /*const appointments = [

  {  id: 1, title:'Mail New Leads for Follow Up', startDate: '2022-03-21T11:30:00.000Z', uid: 3},
    {  id: 2, title: 'Product Meeting', startDate: '2022-03-21T14:00', endDate: '2021-03-21T16:00' },
    {  id: 3, title: 'Send Territory Sales Breakdown', startDate: '2022-03-19T22:00' },
    {  id: 4, title: 'test', startDate: 'Mon Mar 14 2022 11:00:00 GMT+0000 (Greenwich Mean Time)', endDate: 'Mon Mar 14 2022 11:30:00 GMT+0000 (Greenwich Mean Time)', allDay: false}

  ];
  */
  
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

    setData(appointments);

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

        //data = data.map(appointment => (
        //  changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

        setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

      }

      if(deleted !== undefined){

        //data = data.filter(appointment => appointment.id !== deleted);
        setData(data.filter(appointment => appointment.id !== deleted));

      }

      return { data };
    })

  }

  useEffect(() => {

    setData(appointments);

  }, []);

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