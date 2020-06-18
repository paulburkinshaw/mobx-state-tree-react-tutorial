import { types, Instance, applySnapshot, flow, onSnapshot } from 'mobx-state-tree';
import { v4 as uuidv4 } from 'uuid';
import api from 'axios';

const EmployeeModel = types.model("Employee", {
    id: types.identifier,
    employeeName: types.string,
    hoursWorked: types.number
})
    .actions(self => {
        function editEmployee(name: string, hours_worked: number) {
            applySnapshot(self, { ...self, employeeName: name, hoursWorked: hours_worked })
        }
        return { editEmployee }
    })

const EmployerModel = types.model("Employer", {
    id: types.identifier,
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel)
})
    .actions(self => { //self is a representation of the instance above of Employer node
        function newEmployee(employeeName: string, hoursWorked: number) {
            const id = uuidv4();
            applySnapshot(self,
                {
                    ...self, employees: [{ id, employeeName, hoursWorked }, ...self.employees]
                });
        }
        function afterCreate() {
            onSnapshot(self, (snapshot: any) => save(snapshot))
        }
        const save = flow(function* save(snapshot: any) {
            try {
                const response = yield api.post('/employers', { snapshot });
                console.log('response', response);
            } catch (e) {
                console.log('error:', e);
            }
        })

        return { newEmployee, save, afterCreate };
    })
    .views(self => ({
        get num_employees() {
            return self.employees.length;
        },
        filtered_employees(searchString: string) {
            return self.employees.filter(employee =>
                employee.employeeName.toLowerCase().includes(searchString.toLowerCase())
            )
        }
    }))

const RootModel = types.model("Root", {
    employer: EmployerModel
});

export { RootModel };


export type Root = Instance<typeof RootModel>;
export type Employer = Instance<typeof EmployerModel>;
export type Employee = Instance<typeof EmployeeModel>;

