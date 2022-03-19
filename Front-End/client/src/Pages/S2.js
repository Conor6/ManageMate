import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

//import { appointments } from '../../../demo-data/appointments';

const appointments = [
    { id: 1,title: 'Mail New Leads for Follow Up', startDate: '2022-03-18T10:00' },
    { id: 2, title: 'Product Meeting', startDate: '2022-03-18T14:00', endDate: '2022-03-18T16:00' },
    { id: 3, title: 'Send Territory Sales Breakdown', startDate: '2022-03-18T22:00' },
  ];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        console.log("if(added)");
        console.log(data);
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        console.log("if(changed)");
        console.log(data);
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
        console.log("if(deleted)");
        console.log(data);
      }
      return { data };
    });
  }

  render() {
    const { currentDate, data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
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
    );
  }
}