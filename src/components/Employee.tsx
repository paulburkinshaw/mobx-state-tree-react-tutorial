import * as React from "react";
import { Employee } from "../mst";
import { observer, inject } from "mobx-react";
import { Root } from "../mst";

interface EmployeeComponentProps {
    employee: Employee;
}

interface EmployeeComponentState {
    employeeName: string;
    hoursWorked: string;
    edit: boolean;
}

@inject("rootTree")
@observer
class EmployeeComponent extends React.Component<EmployeeComponentProps, EmployeeComponentState> {

    constructor(props: EmployeeComponentProps) {
        super(props);

        this.state = {
            employeeName: this.props.employee.employeeName,
            hoursWorked: `${this.props.employee.hoursWorked}`,
            edit: false
        };

        this.changeEmployeeName = this.changeEmployeeName.bind(this);
        this.changeHoursWorked = this.changeHoursWorked.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // defining with a classic function binds the function to the base prototype rather than instance of the component
    // because we could have many instances of employees and therefore many copies of the functions
    changeEmployeeName(e: any) {
        const employeeName = e.target.value;
        this.setState({ employeeName })
    }

    changeHoursWorked(e: any) {
        const hoursWorked = e.target.value;
        this.setState({ hoursWorked })
    }

    toggleEdit() {
        this.setState(prev => ({ edit: !prev.edit }))
    }

    onSubmit(e: any) {
        e.preventDefault();

        const { employeeName, hoursWorked } = this.state;

        this.props.employee.editEmployee(employeeName, parseInt(hoursWorked))
        this.toggleEdit();
    }

    render() {
        const { hoursWorked, employeeName } = this.props.employee
        const { edit } = this.state
        return (
            <div>
                {edit ? (
                    <form onSubmit={this.onSubmit}>
                        <p>Name: </p>
                        <input value={this.state.employeeName} onChange={this.changeEmployeeName} />
                        <p>Hours worked: </p>
                        <input value={this.state.hoursWorked} onChange={this.changeHoursWorked} />
                        <br />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.toggleEdit}>Cancel</button>
                    </form>
                ) : (
                        <>
                            <p>
                                {`Name: ${employeeName}`}
                            </p>
                            <p>
                                {`Hours worked: ${hoursWorked}`}
                            </p>
                            <button onClick={this.toggleEdit}>Edit</button>
                        </>
                    )
                }

            </div>
        )
    }
}

export { EmployeeComponent }
