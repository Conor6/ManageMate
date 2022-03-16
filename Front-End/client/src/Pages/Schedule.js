import { useEffect, useState} from "react";
import {useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView,Appointments, } from '@devexpress/dx-react-scheduler-material-ui';


function Schedule({setAuth}) {

  const currentDate = '2018-11-01';
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];
  

  return (
    <Container>
      <Paper>
        <Scheduler data={schedulerData}>
          <ViewState currentDate={currentDate}/>
        
      
          <DayView startDayHour={17} endDayHour={23} />

          <Appointments />

        </Scheduler>
        
      </Paper>

    </Container>
  );
}

export default Schedule;
