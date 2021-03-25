import React, { Component } from "react";
import Loading from "components/Loading";
import Panels from "components/Panel";
import classnames from "classnames";
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
  state = { loading: false, focused: null };

  selectPanel(id) {
    this.setState((previousState) => ({
      focused: previousState.focused !== null ? null : id,
    }));
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
