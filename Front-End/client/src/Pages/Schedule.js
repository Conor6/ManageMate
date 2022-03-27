import { useEffect, useState, useCallback} from "react";
import {useNavigate, useParams } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments, AppointmentTooltip, ConfirmationDialog, Toolbar, DateNavigator, TodayButton, ViewSwitcher, MonthView, EditRecurrenceMenu, } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { colors, formControlLabelClasses, } from "@mui/material";
import './Schedule.css';


function Schedule() {

  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("Week");

  const ages = [{id: 1, text:"Academy"}, {id: 2, text:"U11"},{id: 3, text:"U12"},{id: 4, text:"U13"},{id: 5, text:"U14"},{id: 6, text:"U15"},
    {id: 7, text:"U16"},{id: 8, text:"U17"},{id: 9, text:"U18"},{id: 10, text:"U19"},{id: 11, text:"U20"},{id: 12, text:"Division 1"},
    {id: 13, text:"Divison 3"},{id: 14, text:"Divison 5"},{id: 15, text:"National League"},{id: 16, text:"Super League"},
  ];

  const gender = [{id: 1, text:"Boys"}, {id:2, text:"Girls"}, {id: 3, text: "Men"}, {id: 4, text: "Women"}, {id:5, text: "Mixed"}];

  const activities = [{id: 1, text:"Training"}, {id:2, text:"Match"}, {id: 3, text: "Scrimmage"}, {id: 4, text: "Skills Session"}, {id:5, text: "Other"}];

  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    
    if (props.type === 'titleTextEditor') {
      return null;
    } 
    if (props.type === 'multilineTextEditor') {
      return null;
    } 
    return <AppointmentForm.TextEditor {...props} />;
  };

  const Label = (props =>{
    console.log("Props")
    console.log(props);

    if (props.text === "Details") {
      return null;
    } 
    if (props.text === "More Information") {
      return null;
    } 

    return <AppointmentForm.Label {...props} />;
  })

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {




    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
  
      </AppointmentForm.BasicLayout>
    );
  };

  //Function which is used to changed the data displayed on screen depending on what view is being displayed
  const currentViewNameChange = (currentViewName) =>{

    setCurrentViewName(currentViewName)
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

  useEffect(() => {

    getAppointments();

  }, []);

  const commitChanges = ({added, changed, deleted}) => {

    setData( ()=>{

      if(added){

        if(added.ageMenu == undefined){
          added.ageMenu = 1;
        }
    
        if(added.genderMenu == undefined){
          added.genderMenu = 1;
        }

        if(added.ageMenu && added.genderMenu != undefined){
          added.ageMenu = ages[added.ageMenu-1].text;
          added.genderMenu = gender[added.genderMenu-1].text;
        }

        const startingAddedId = data.length > 0 ? data[data.length -1].id +1 : 0;
        let booking = [...data, { id: startingAddedId, ...added }]

        booking[startingAddedId].title = booking[startingAddedId].ageMenu + " " + booking[startingAddedId].genderMenu;

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

          let body = data;
          const response = await fetch("http://localhost:3001/update-appointment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
        }
        
        setData(data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

        let changedApp = data.find(appointment => (changed[appointment.id]));
        let changedId = changedApp.id;
        let apps = data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
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
        <Scheduler data={data} height={700} >

          <ViewState 
            currentViewName={currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />

          <EditingState onCommitChanges={commitChanges}/>

          <DayView startDayHour={9} endDayHour={23} />

          <WeekView startDayHour={17} endDayHour={23} />

          <WeekView
            name="Pres"
            displayName="Presentation"
            startDayHour={9}
            endDayHour={23}
          />

          <MonthView/>

          <Toolbar />
          <ViewSwitcher/>
          <DateNavigator />
          <TodayButton />
          <IntegratedEditing/>

          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />

          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            labelComponent={Label}
          />

          



        </Scheduler>
      </Paper>
      
    </Container>
  );
}

export default Schedule;