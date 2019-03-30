import {
  IonButtons, IonContent, IonHeader, IonMenuButton,
  IonPage, IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <IonPage className="home-page">
        <IonHeader>
          <IonToolbar
            color="primary"
          >
            <IonButtons
              slot="start"
            >
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="home-container">
            <h1>
              Ionic React application
            </h1>
            <div>
              <img
                className="home-img"
                src="./assets/img/ionicreact.png"
                alt="Ionic React"
              />
            </div>
            <p>
              Your Ionic React app is good to go! Happy coding.
            </p>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
