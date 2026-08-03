import {useState} from "react";
import "./Settings.css";

import {
    FaUser,
    FaMoon,
    FaKey,
    FaTrashAlt,
    FaSignOutAlt,
    FaShieldAlt
} from "react-icons/fa";

import {
    updateUserProfile,
    logoutUser,
    changeUserPassword,
    deleteAccount
} from "../../firebase/auth";

import {
    deleteAllConversations
} from "../../services/conversationService";

import {useAuth} from "../../context/AuthContext";


export default function Settings({theme,toggleTheme}){

    const {user,refreshUser}=useAuth();

    const [activePanel,setActivePanel]=useState(null);

    const [name,setName]=useState(
        user?.displayName || ""
    );

    const [currentPassword,setCurrentPassword]=useState("");

    const [newPassword,setNewPassword]=useState("");

    const [message,setMessage]=useState("");



    const getInitials=(name)=>{

        if(!name)
            return "U";

        const words=name.trim().split(" ");

        if(words.length===1)
            return words[0][0].toUpperCase();

        return (
            words[0][0]+words[1][0]
        ).toUpperCase();

    };



    const closePanel=()=>{

        setActivePanel(null);
        setMessage("");

    };



    const updateProfile=async()=>{

        try{

            await updateUserProfile(user,{
                displayName:name
            });

            await refreshUser();

            setMessage(
                "Profile updated successfully"
            );

        }
        catch{

            setMessage(
                "Unable to update profile"
            );

        }

    };



    const updatePassword=async()=>{

        if(!currentPassword || !newPassword){

            setMessage(
                "Fill all password fields"
            );

            return;

        }


        try{

            await changeUserPassword(
                user,
                currentPassword,
                newPassword
            );


            setMessage(
                "Password changed successfully"
            );


            setCurrentPassword("");
            setNewPassword("");

        }
        catch(error){

            setMessage(
                error.message
            );

        }

    };



    const removeAccount=async()=>{

        try{

            await deleteAllConversations(
                user.uid
            );


            await deleteAccount(
                user
            );


            window.location.href="/";

        }
        catch(error){

            setMessage(
                error.message
            );

        }

    };



    const logout=async()=>{

        await logoutUser();

        window.location.href="/";

    };



    const renderPanel=()=>{

        if(!activePanel)
            return null;


        return(

            <div
                className="settings-overlay"
                onClick={closePanel}
            >

                <div
                    className="settings-modal"
                    onClick={
                        e=>e.stopPropagation()
                    }
                >

                    <button
                        className="close-modal"
                        onClick={closePanel}
                    >
                        ×
                    </button>



                    {
                        activePanel==="account" &&

                        <>

                        <div className="modal-header">

                            <div className="modal-icon account">
                                {
                                    getInitials(
                                        user?.displayName
                                    )
                                }
                            </div>

                            <div>
                                <h3>
                                    Account information
                                </h3>

                                <p className="modal-subtitle">
                                    Manage your name and view your email
                                </p>
                            </div>

                        </div>


                        <label className="field-label">
                            Username
                        </label>

                        <input
                            value={name}
                            onChange={
                                e=>setName(e.target.value)
                            }
                            placeholder="Username"
                        />


                        <label className="field-label">
                            Email address
                        </label>

                        <div className="field-static">
                            {user?.email}
                        </div>


                        <button
                            onClick={updateProfile}
                        >
                            Save changes
                        </button>

                        </>

                    }



                    {
                        activePanel==="security" &&

                        <>

                        <div className="modal-header">

                            <div className="modal-icon security">
                                <FaKey/>
                            </div>

                            <div>
                                <h3>
                                    Change password
                                </h3>

                                <p className="modal-subtitle">
                                    Update the password for your account
                                </p>
                            </div>

                        </div>


                        <label className="field-label">
                            Current password
                        </label>

                        <input
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={
                                e=>setCurrentPassword(
                                    e.target.value
                                )
                            }
                        />


                        <label className="field-label">
                            New password
                        </label>

                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={
                                e=>setNewPassword(
                                    e.target.value
                                )
                            }
                        />


                        <button
                            onClick={updatePassword}
                        >
                            Update password
                        </button>

                        </>

                    }



                    {
                        activePanel==="appearance" &&

                        <>

                        <div className="modal-header">

                            <div className="modal-icon appearance">
                                <FaMoon/>
                            </div>

                            <div>
                                <h3>
                                    Appearance
                                </h3>

                                <p className="modal-subtitle">
                                    Customize how the app looks
                                </p>
                            </div>

                        </div>


                        <div className="theme-row">

                            <span>
                                Dark mode
                            </span>


                            <button
                                onClick={toggleTheme}
                            >

                            {
                                theme==="dark"
                                ?"OFF"
                                :"ON"
                            }

                            </button>


                        </div>

                        </>

                    }



                    {
                        activePanel==="privacy" &&

                        <>

                        <div className="modal-header">

                            <div className="modal-icon privacy">
                                <FaShieldAlt/>
                            </div>

                            <div>
                                <h3>
                                    Privacy policy
                                </h3>

                                <p className="modal-subtitle">
                                    How we handle your data
                                </p>
                            </div>

                        </div>


                        <div className="privacy-text">

                            <p>
                                This AI Disease Detection and Treatment Recommendation System
                                collects information provided during health assessments.
                            </p>


                            <p>
                                The information is used to provide AI-generated health
                                recommendations and improve user experience.
                            </p>


                            <p>
                                This system does not replace professional medical advice.
                            </p>


                            <p>
                                Users may request deletion of their account and stored data.
                            </p>


                        </div>

                        </>

                    }



                    {
                        activePanel==="delete" &&

                        <>

                        <div className="modal-header">

                            <div className="modal-icon danger">
                                <FaTrashAlt/>
                            </div>

                            <div>
                                <h3>
                                    Delete account
                                </h3>

                                <p className="modal-subtitle">
                                    This can't be undone
                                </p>
                            </div>

                        </div>


                        <p>
                            This permanently deletes your account and conversations.
                        </p>


                        <button
                            className="danger-btn"
                            onClick={removeAccount}
                        >
                            Delete permanently
                        </button>


                        </>

                    }



                    {
                        message &&

                        <small className="message">
                            {message}
                        </small>

                    }


                </div>

            </div>

        );

    };



    return(

        <div className="settings-page">

            <h2>
                Settings
            </h2>



            <div className="settings-grid">


                <div
                    className="settings-tile"
                    onClick={()=>
                        setActivePanel("account")
                    }
                >

                    <FaUser/>

                    <div>
                        <h3>
                            Account
                        </h3>

                        <p>
                            Manage profile information
                        </p>
                    </div>

                </div>



                <div
                    className="settings-tile"
                    onClick={()=>
                        setActivePanel("security")
                    }
                >

                    <FaKey/>

                    <div>
                        <h3>
                            Security
                        </h3>

                        <p>
                            Change password
                        </p>
                    </div>

                </div>



                <div
                    className="settings-tile"
                    onClick={()=>
                        setActivePanel("appearance")
                    }
                >

                    <FaMoon/>

                    <div>
                        <h3>
                            Appearance
                        </h3>

                        <p>
                            Theme settings
                        </p>
                    </div>

                </div>



                <div
                    className="settings-tile"
                    onClick={()=>
                        setActivePanel("privacy")
                    }
                >

                    <FaShieldAlt/>

                    <div>
                        <h3>
                            Privacy Policy
                        </h3>

                        <p>
                            View data policies
                        </p>
                    </div>

                </div>



                <div
                    className="settings-tile danger"
                    onClick={()=>
                        setActivePanel("delete")
                    }
                >

                    <FaTrashAlt/>

                    <div>
                        <h3>
                            Delete Account
                        </h3>

                        <p>
                            Permanently remove account
                        </p>
                    </div>

                </div>



                <div
                    className="settings-tile"
                    onClick={logout}
                >

                    <FaSignOutAlt/>

                    <div>
                        <h3>
                            Logout
                        </h3>

                        <p>
                            Sign out of account
                        </p>
                    </div>

                </div>


            </div>


            {renderPanel()}


        </div>

    );

}