// tslint:disable-next-line: no-submodule-imports
import "@ionic/core/css/core.css";
// tslint:disable-next-line: no-submodule-imports
import "@ionic/core/css/ionic.bundle.css";
import { IonApp, IonButton, IonPage, IonSplitPane } from "@ionic/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import About from "./containers/About";
import Home from "./containers/Home";
import Todo from "./containers/Todo";
import "./theme.css";

const App = (props: any) => {
    return (
        <Router>
            <div id="app">
                <IonApp>
                    <IonSplitPane contentId="main">
                        <SideMenu />
                        <div id="main">
                            <Switch>
                            <Route path="/todo" component={Todo} />
                            <Route path="/about" component={About} />
                            <Route path="/" component={Home} />
                        </Switch>
                        </div>
                    </IonSplitPane>
                </IonApp>
            </div>
        </Router>
    );
};

export default App;
