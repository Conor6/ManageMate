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


const appointments = [
  {  id: 1, title:'Mail New Leads for Follow Up', startDate: '2022-03-22T10:00', uid: 3},
  {  id: 2, title: 'Product Meeting', startDate: '2022-03-22T14:00', endDate: '2022-03-22T16:00' },
  {  id: 3, title: 'Send Territory Sales Breakdown', startDate: '2022-03-19T22:00' },
  {  id: 4, title: 'test', startDate: 'Mon Mar 22 2022 11:00:00 GMT+0000 (Greenwich Mean Time)', endDate: 'Mon Mar 22 2022 11:30:00 GMT+0000 (Greenwich Mean Time)', allDay: false},
  {  id: 5, title: 'testing, startDate'}
];


const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  console.log("PROOPS")
  console.log(props)
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Custom Field"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Custom field"
      />
    </AppointmentForm.BasicLayout>
  );
};

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
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
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
            endDayHour={15}
          />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <ConfirmationDialog />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            
          />
        </Scheduler>
      </Paper>
    );
  }
}
