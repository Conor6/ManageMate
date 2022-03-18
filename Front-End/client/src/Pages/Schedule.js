import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { formControlLabelClasses } from "@mui/material";


function Schedule() {

  const appointments = [
    {  id: 1, title:'Mail New Leads for Follow Up', startDate: '2022-03-18T10:00' },
    {  id: 2, title: 'Product Meeting', startDate: '2022-03-18T14:00', endDate: '2022-03-18T16:00' },
    {  id: 3, title: 'Send Territory Sales Breakdown', startDate: '2022-03-18T22:00' },
  ];


  const [state, setState] = useState(appointments);
  const [data, setData] = useState(state);

  //let bob = "bob";

  //setData(bob);
  //console.log("Data:");
  //console.log(data);

  //console.log(state);
  //let test;
  //console.log(typeof state);
  //console.log(typeof test);
  

  const commitChanges = ({added, changed, deleted}) => {

    setState(()=>{

      if(added){

        const startingAddedId = data.length > 0 ? data[data.length -1].id +1 : 0;
        //data = [...data, { id: startingAddedId, ...added }];

        let test = [...data, { id: startingAddedId, ...added }]
        //console.log("test");
        //console.log(test);

        setData(test);
        console.log("if(added)");
        console.log(data);
        
      }

      console.log("outside if(added)");
      console.log(data);

      if(changed){

        //data = data.map(appointment => (
        //  changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

        //console.log(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

        setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

        

      }


      if(deleted !== undefined){
        //data = data.filter(appointment => appointment.id !== deleted);
        setData(data.filter(appointment => appointment.id !== deleted));
        console.log("if(deleted)");
        console.log(data);
      }
      
      console.log("state");
      console.log(state);

      return { data };

    })

    //setState(data);
    console.log("After changes");
    console.log(state);

  }


  

  useEffect(() => {
    console.log("Use Effect");
    setData(state);
    console.log(state);
  }, [])
  
  //const {data} = state;

  console.log("Data");
  console.log(data);


  console.log("state 2");
  console.log(state);

  

  return (
    <Container fluid>
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            
          />
          <EditingState
            onCommitChanges={commitChanges}
          />
          <IntegratedEditing />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />
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
