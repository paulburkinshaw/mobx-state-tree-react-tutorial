import * as React from "react";
import { Employee } from "../mst";
import { observer } from "mobx-react";

interface EmployeeComponentProps {
    employee: Employee;
}

interface EmployeeComponentState {

}

@observer
class EmployeeComponent extends React.Component<EmployeeComponentProps, EmployeeComponentState> {

    render() {
        const { hoursWorked, employeeName } = this.props.employee
        return (
            <div>
                <p>
                    {`Name: ${employeeName}`}
                </p>
                <p>
                    {`Hours worked: ${hoursWorked}`}
                </p>
            </div>
        )
    }
}

export { EmployeeComponent }
