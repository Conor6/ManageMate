import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';


function Schedule() {

  const appointments = [
    { title: 'Mail New Leads for Follow Up', startDate: '2022-03-18T10:00' },
    { title: 'Product Meeting', startDate: '2022-03-18T14:00', endDate: '2022-03-18T16:00' },
    { title: 'Send Territory Sales Breakdown', startDate: '2022-03-18T22:00' },
  ];


  const [state, setState] = useState(appointments);
  const [data, setData] = useState();

  //console.log(state);
  //let test;
  //console.log(typeof state);
  //console.log(typeof test);
  

  const commitChanges = ({added, changed, deleted}) => {

    setState((state)=>{

      //console.log("State:")
      //console.log(state);
      //setData(state);

      //console.log("Data:")
      //console.log(data);

      if(added){
        const startingAddedId = data.length > 0 ? data[data.length -1].id +1 : 0;
        //data = [...data, { id: startingAddedId, ...added }];
        setData([...data, { id: startingAddedId, ...added }]);
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
      return {data};
    })

  }

  //console.log(state);

  

  useEffect(() => {
    setData(state);
  }, [])

  //const {data} = state;

  //console.log("Data");
  //console.log(data);
  

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
