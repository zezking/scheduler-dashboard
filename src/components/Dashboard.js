import React, { Component } from "react";
import Loading from "components/Loading";
import Panels from "components/Panel";
import classnames from "classnames";
import axios from "axios";
const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6,
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm",
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday",
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3",
  },
];

class Dashboard extends Component {
  state = {
    loading: true,
    focused: null,
    days: [],
    appointments: [],
    interviewers: [],
  };

  selectPanel(id) {
    this.setState((previousState) => ({
      focused: previousState.focused !== null ? null : id,
    }));
  }
  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
    });

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused,
    });

    if (this.state.loading) {
      return <Loading />;
    }
    const panels = data
      .filter(
        (panel) =>
          this.state.focused === null || this.state.focused === panel.id
      )
      .map((panel) => {
        return (
          <Panels
            key={panel}
            id={panel.id}
            value={panel.value}
            label={panel.label}
            onSelect={(event) => this.selectPanel(panel.id)}
          />
        );
      });
    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
