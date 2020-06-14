import { types, Instance, applySnapshot } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';

const EmployeeModel = types.model("Employee", {
    id: types.identifier,
    employeeName: types.string,
    hoursWorked: types.number
});

const EmployerModel = types.model("Employer", {
    id: types.identifier,
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel)
}).actions(self => {
    function newEmployee(employeeName: string, hoursWorked: number) {
        const id = uuidv4();
        applySnapshot(self,
            {
                ...self, employees: [{ id, employeeName, hoursWorked }, ...self.employees]
            });
    }
    return { newEmployee };
})

const RootModel = types.model("Root", {
    employer: EmployerModel
});

export { RootModel };


export type Root = Instance<typeof RootModel>;
export type Employer = Instance<typeof EmployerModel>;
export type Employee = Instance<typeof EmployeeModel>;

