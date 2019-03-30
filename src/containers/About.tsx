import {
  IonButtons, IonCard, IonCardContent, IonCardHeader,
  IonContent, IonHeader, IonMenuButton, IonPage,
  IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";

const About = () => {
  return (
    <>
      <IonPage className="about-page">
        <IonHeader>
          <IonToolbar
            color="primary"
          >
            <IonButtons
              slot="start"
            >
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <h1>About</h1>
            </IonCardHeader>
            <IonCardContent>
              This app is created using create-ionic-react-app
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default About;
