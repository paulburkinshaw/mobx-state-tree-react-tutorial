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
    searchString: string;
}

@inject("rootTree")
@observer
class EmployerComponent extends React.Component<EmployerComponentProps, EmployerComponentState> {

    constructor(props: EmployerComponentProps) {
        super(props);
        this.state = {
            employeeName: "",
            hoursWorked: "",
            searchString: ""
        };
    }

    // defining with an arrow function binds the function to the instance of the component 
    changeEmployeeName = (e: any) => {
        const employeeName = e.target.value;
        this.setState({ employeeName });
    }

    changeHoursWorked = (e: any) => {
        const hoursWorked = e.target.value;
        this.setState({ hoursWorked });
    }

    searchStringChange = (e: any) => {
        const searchString = e.target.value;
        this.setState({ searchString });
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        const { employeeName, hoursWorked } = this.state;

        //destructure our root store from props
        const { rootTree } = this.props;

        if (!rootTree) return null;

        rootTree.employer.newEmployee(employeeName, parseInt(hoursWorked));
        this.setState({employeeName: "", hoursWorked: ""})

    }

    render() {
        const { rootTree } = this.props;
        // destructure employeeName, hoursWorked, searchString from state so they can be accessed
        const { employeeName, hoursWorked, searchString } = this.state;
        if (!rootTree) return null;
        const num_employees = rootTree.employer.num_employees;
        const filtered_employees = rootTree.employer.filtered_employees(searchString);
        return (
            <div>
                <h1> {rootTree.employer.name} </h1>
                <h3> {rootTree.employer.location} </h3>
                <p>{`Total Number of Employees : ${num_employees}`}</p>
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
                <input placeholder="Search Employee Name" value={searchString} onChange={this.searchStringChange} />
            
                {filtered_employees.map(employee => (
                    <EmployeeComponent employee={employee} key={employee.id} />
                ))}
            </div>
        )

    }

}

export { EmployerComponent };