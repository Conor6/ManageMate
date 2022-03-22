import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, Toolbar, DateNavigator, TodayButton, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { formControlLabelClasses, } from "@mui/material";


function S3() {

  const appointments = [
    {  id: 1, title:'Mail New Leads for Follow Up', startDate: '2022-03-22T10:00', uid: 3},
    {  id: 2, title: 'Product Meeting', startDate: '2022-03-22T14:00', endDate: '2022-03-22T16:00' },
    {  id: 3, title: 'Send Territory Sales Breakdown', startDate: '2022-03-19T22:00' },
    {  id: 4, title: 'test', startDate: 'Mon Mar 22 2022 11:00:00 GMT+0000 (Greenwich Mean Time)', endDate: 'Mon Mar 22 2022 11:30:00 GMT+0000 (Greenwich Mean Time)', allDay: false},
    {  id: 5, title: 'testing, startDate'}
  ];


  //const [state, setState] = useState(appointments);
  const [data, setData] = useState(appointments);

  //let test = state;

  //console.log("test");
  //console.log(test);

  //console.log("Data:");
  //console.log(data);

  //console.log(state);
  //let test;
  //console.log(typeof state);
  //console.log(typeof test);
  

  const commitChanges = ({added, changed, deleted}) => {

    setData(()=>{

      if(added){

        const startingAddedId = data.length > 0 ? data[data.length -1].id +1 : 0;
        //data = [...data, { id: startingAddedId, ...added }];

        //console.log(startingAddedId-1);

        let booking = [...data, { id: startingAddedId, ...added }]
        console.log("booking");
        console.log(booking[startingAddedId-1].title);


        const addBooking = async (booking, startingAddedId) => {
          
          //console.log("Add booking");
          //console.log(booking);
          console.log(startingAddedId);
          
          const data = {
        
            booking_id: booking[startingAddedId-1].id,
            booking_title: booking[startingAddedId-1].title,
            start_date: booking[startingAddedId-1].startDate,
            end_date: booking[startingAddedId-1].endDate,
      
          };

          let body = data;


          const response = await fetch("http://localhost:3001/appointment", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)

          });

          console.log("response")
          console.log(response);
        
          


        }

        addBooking(booking, startingAddedId);
          
      
        setData(booking);
        
        //console.log("if(added)");
        //console.log(data);
        
      }

      //console.log("outside if(added)");
      //console.log(data);

      if(changed){

        //data = data.map(appointment => (
        //  changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

        //console.log(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

        setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

        

      }


      if(deleted !== undefined){

        //data = data.filter(appointment => appointment.id !== deleted);

        setData(data.filter(appointment => appointment.id !== deleted));

        //console.log("if(deleted)");
        //console.log(data);
      }
      
      //console.log("state");
      //console.log(state);

      return { data };

    })

    //setState(data);
    //console.log("After changes");
    //console.log(state);

  }


  useEffect(() => {

    //console.log("Use Effect");
    setData(appointments);
    //console.log(state);

  }, []);
  
  //const {data} = state;

  //console.log("Data");
  //console.log(data);


  //console.log("state 2");
  //console.log(state);

  
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

export default S3;