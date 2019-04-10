import {
    IonButtons, IonCard, IonCardContent, IonCardHeader,
    IonContent, IonHeader, IonMenuButton, IonPage,
    IonTitle, IonToolbar, IonList, IonItem, IonLabel
} from "@ionic/react";
import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";

const mapStateToProps = ({ todo }: ApplicationState) => {
    const { list } = todo;
    return { list };
};
type ReduxType = ReturnType<typeof mapStateToProps>;

const Todo: React.FC<ReduxType> = (props) => {
    const { list } = props;

    const renderList = () => {
        return list.map((item: string) => (
            <IonItem key={item}>
                <IonLabel>
                    {item}
                </IonLabel>
            </IonItem>
        ));
    };

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
                        <IonTitle>Todo</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonCardContent>
                            <IonList>
                                {renderList()}
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    );
};

export default connect(mapStateToProps)(Todo);
