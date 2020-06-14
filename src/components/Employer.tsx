import * as React from "react";
import { inject, observer } from "mobx-react";
import { Root } from "../mst";
import { EmployeeComponent } from "./Employee";

interface EmployerComponentProps {
    rootTree?: Root;
}

interface EmployerComponentState {
    employeeName: string;
    hoursWorked: string;
}

@inject("rootTree")
@observer
class EmployerComponent extends React.Component<EmployerComponentProps, EmployerComponentState> {

    constructor(props: EmployerComponentProps) {
        super(props);
        this.state = {
            employeeName: '',
            hoursWorked: ''
        };
    }

    changeEmployeeName = (e: any) => {
        const employeeName = e.target.value;
        this.setState({ employeeName });
    }

    changeHoursWorked = (e: any) => {
        const hoursWorked = e.target.value;
        this.setState({ hoursWorked });
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        const { employeeName, hoursWorked } = this.state;

        //destructure our root store from props
        const { rootTree } = this.props;

        if (!rootTree) return null;

        rootTree.employer.newEmployee(employeeName, parseInt(hoursWorked));

    }

    render() {
        const { rootTree } = this.props;
        const { employeeName, hoursWorked } = this.state;
        if (!rootTree) return null;

        return (
            <div>
                <h1> {rootTree.employer.name} </h1>
                <h3> {rootTree.employer.location} </h3>
                <hr />
                <p>New Employee</p>
                <form onSubmit={this.onSubmit}>
                    <p>Name: </p>
                    <input value={employeeName} onChange={this.changeEmployeeName} />
                    <p>Hours worked: </p>
                    <input value={hoursWorked} onChange={this.changeHoursWorked} />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <hr />
                {rootTree.employer.employees.map(employee => (
                    <EmployeeComponent employee={employee} key={employee.id} />
                ))}
            </div>
        )

    }

}

export { EmployerComponent };