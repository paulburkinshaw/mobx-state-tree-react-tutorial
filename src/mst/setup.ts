import { RootModel } from "."
import { onSnapshot, getSnapshot, applySnapshot } from "mobx-state-tree";

import makeInspectable from "mobx-devtools-mst";

export const setupRootStore = () => {
    
    const rootTree = RootModel.create({
        employer: {
            id: "1",
            name: "Red Hare Consulting",
            location: "UK",
            employees: []
        }
    });

    makeInspectable(rootTree);

    onSnapshot(rootTree, (snapshot) => console.log('snapshot: ', snapshot))

    // dont need these, just to demonstrate onSnapshot
    /* const currentRootTree = getSnapshot(rootTree)
    applySnapshot(rootTree, {...currentRootTree, employer: {...currentRootTree.employer, location: "Manhattan"} }) */

    return { rootTree };
};