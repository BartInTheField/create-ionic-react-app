import {
    IonContent, IonHeader, IonIcon, IonItem,
    IonLabel, IonList, IonMenu, IonMenuToggle,
    IonTitle, IonToolbar
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Page {
    title: string;
    path: string;
    icon: string;
}

const pages: Page[] = [
    { title: "Home", path: "/", icon: "home" },
    { title: "About", path: "/about", icon: "information" },
];

type Props = RouteComponentProps<{}>;

const SideMenu = ({ history }: Props) => {
    const [activePage, setActivePage] = useState(pages[0].title);

    const renderMenuItems = (): JSX.Element[] => {
        return pages.map((page: Page) => {
            const getActiveColor = (): string => page.title === activePage ? "primary" : "";
            return (
                <IonMenuToggle key={page.title} auto-hide="false">
                    <IonItem
                        button={true}
                        onClick={navigateToPage.bind(undefined, page)}
                    >
                        <IonIcon
                            color={getActiveColor()}
                            slot="start"
                            name={page.icon}
                        />
                        <IonLabel
                            color={getActiveColor()}
                        >
                            {page.title}
                        </IonLabel>
                    </IonItem>
                </IonMenuToggle>
            );
        });
    };

    const navigateToPage = (page: Page) => {
        history.push(page.path);
        setActivePage(page.title);
    };

    return (
        <IonMenu
            contentId="main"
        >
            <IonHeader>
                <IonToolbar
                    color="primary"
                >
                    <IonTitle>
                        Menu
          </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {renderMenuItems()}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default withRouter(
    SideMenu,
);
