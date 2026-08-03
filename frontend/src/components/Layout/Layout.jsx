import "./Layout.css";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

import { useState } from "react";


export default function Layout({
    children,
    theme,
    toggleTheme
}) {


    const [sidebarOpen, setSidebarOpen] = useState(true);



    return (

        <div
            className={
                sidebarOpen
                ? "layout sidebar-open"
                : "layout sidebar-closed"
            }
        >


            <Header

                theme={theme}

                toggleTheme={toggleTheme}

                toggleSidebar={() =>
                    setSidebarOpen(!sidebarOpen)
                }

            />



            <Sidebar

                open={sidebarOpen}

            />




            <div className="layout-main">



                <main className="layout-content">


                    <div className="content-wrapper">

                        {children}

                    </div>


                </main>


            </div>



        </div>

    );

}