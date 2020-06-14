import React from 'react';
import { Provider } from "mobx-react";
import logo from './logo.svg';
import './App.css';
import { setupRootStore } from './mst/setup';
import { EmployerComponent } from './components/Employer';

import makeInspectable from "mobx-devtools-mst";
import { Employer } from './mst';

interface Props {
  // employerComponent?: Employer;
}

interface State {
  rootTree: any
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rootTree: null
    };
  }

  componentDidMount = () => {
    const { rootTree } = setupRootStore();
    makeInspectable(rootTree);
    this.setState({ rootTree })
  }

  render() {

    const { rootTree } = this.state

    if (!rootTree) return null;

    return (
      <Provider rootTree={rootTree}>
        <EmployerComponent />
      </Provider>
    );
  }

}

export default App;
