import "./AuthIllustration.css";

import {
    FaHeartbeat,
    FaBrain,
    FaUserMd,
    FaNotesMedical,
    FaRobot
} from "react-icons/fa";


export default function AuthIllustration() {

    return (

        <div className="auth-illustration">


            <div className="glow"></div>


            <div className="ai-circle">

                <FaRobot />

            </div>


            <FaHeartbeat className="icon heart"/>

            <FaBrain className="icon brain"/>

            <FaUserMd className="icon doctor"/>

            <FaNotesMedical className="icon notes"/>



            <div className="illustration-text">

                <h1>
                    AI Disease Detection
                </h1>


                <p>
                    Intelligent symptom analysis and treatment recommendations powered by Artificial Intelligence.
                </p>


                <span className="ai-badge">

                    AI Healthcare Assistant

                </span>


            </div>


        </div>

    );

}