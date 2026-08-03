import {useState} from "react";
import "./Settings.css";

import {
    FaUser,
    FaMoon,
    FaSignOutAlt,
    FaInfoCircle,
    FaKey,
    FaTrashAlt,
    FaUserTimes
} from "react-icons/fa";

import {
    updateUserProfile,
    logoutUser,
    changeUserPassword,
    deleteAccount
} from "../../firebase/auth";

import {deleteAllConversations} from "../../services/conversationService";
import {useAuth} from "../../context/AuthContext";


export default function Settings({theme,toggleTheme}){

    const {user,refreshUser}=useAuth();

    const [name,setName]=useState(
        user?.displayName||""
    );

    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");

    const [message,setMessage]=useState("");
    const [passwordMessage,setPasswordMessage]=useState("");

    const [modal,setModal]=useState(null);



    const updateProfile=async()=>{

        try{

            await updateUserProfile(user,{
                displayName:name,
                photoURL:user.photoURL
            });

            await refreshUser();

            setMessage(
                "Profile updated successfully"
            );

        }catch{

            setMessage(
                "Profile update failed"
            );

        }

    };



    const updatePassword=async()=>{

        if(!currentPassword||!newPassword){

            setPasswordMessage(
                "Fill all fields"
            );

            return;

        }


        try{

            await changeUserPassword(
                user,
                currentPassword,
                newPassword
            );

            setPasswordMessage(
                "Password changed successfully"
            );

            setCurrentPassword("");
            setNewPassword("");

        }catch(error){

            setPasswordMessage(
                error.message
            );

        }

    };



    const clearHistory=async()=>{

        try{

            await deleteAllConversations(
                user.uid
            );

            setMessage(
                "Chat history cleared"
            );

        }catch{

            setMessage(
                "Unable to clear history"
            );

        }

        setModal(null);

    };



    const removeAccount=async()=>{

        try{

            await deleteAllConversations(
                user.uid
            );

            await deleteAccount(user);

            window.location.href="/";

        }catch(error){

            setMessage(
                error.message
            );

        }

        setModal(null);

    };



    const logout=async()=>{

        await logoutUser();

        window.location.href="/";

    };



    return(

        <div className="settings-page">

            <h2>Settings</h2>


            <section className="settings-card">

                <div className="settings-title">

                    <FaUser/>

                    <h3>Profile</h3>

                </div>


                <div className="profile-settings">

                    <img
                        src={
                            user?.photoURL||
                            "/default-avatar.png"
                        }
                        alt="profile"
                    />


                    <div>

                        <input
                            value={name}
                            onChange={
                                e=>setName(e.target.value)
                            }
                            placeholder="Username"
                        />


                        <p>
                            {user?.email}
                        </p>


                        <button onClick={updateProfile}>
                            Save Changes
                        </button>


                        {
                            message&&
                            <small>
                                {message}
                            </small>
                        }

                    </div>

                </div>

            </section>



            <section className="settings-card">

                <div className="settings-title">

                    <FaMoon/>

                    <h3>Appearance</h3>

                </div>


                <div className="setting-row">

                    <span>
                        Dark Mode
                    </span>


                    <button onClick={toggleTheme}>
                        {
                            theme==="dark"
                            ?"ON"
                            :"OFF"
                        }
                    </button>

                </div>

            </section>



            <section className="settings-card">

                <div className="settings-title">

                    <FaKey/>

                    <h3>Security</h3>

                </div>


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


                <button onClick={updatePassword}>
                    Change Password
                </button>


                {
                    passwordMessage&&
                    <small>
                        {passwordMessage}
                    </small>
                }

            </section>



            <section className="settings-card">

                <div className="settings-title">

                    <FaTrashAlt/>

                    <h3>Chat Management</h3>

                </div>


                <p>
                    Delete all saved conversations.
                </p>


                <button
                    className="danger-btn"
                    onClick={()=>
                        setModal("history")
                    }
                >
                    Clear Chat History
                </button>

            </section>



            <section className="settings-card">

                <div className="settings-title">

                    <FaSignOutAlt/>

                    <h3>Account</h3>

                </div>


                <button onClick={logout}>
                    Logout
                </button>


                <button
                    className="danger-btn"
                    onClick={()=>
                        setModal("account")
                    }
                >
                    <FaUserTimes/>
                    Delete Account
                </button>

            </section>



            <section className="settings-card">

                <div className="settings-title">

                    <FaInfoCircle/>

                    <h3>About</h3>

                </div>


                <p>
                    AI Disease Detection and Treatment Recommendation System
                </p>


                <small>
                    Version 1.0
                </small>

            </section>



            {
                modal&&

                <div
                    className="delete-modal-overlay"
                    onClick={()=>
                        setModal(null)
                    }
                >

                    <div
                        className="delete-modal"
                        onClick={
                            e=>e.stopPropagation()
                        }
                    >

                        <h3>
                            {
                                modal==="history"
                                ?"Clear Chat History?"
                                :"Delete Account?"
                            }
                        </h3>


                        <p>
                            {
                                modal==="history"
                                ?"All conversations will be permanently removed."
                                :"Your account and data will be permanently deleted."
                            }
                        </p>


                        <div className="delete-modal-actions">

                            <button
                                onClick={()=>
                                    setModal(null)
                                }
                            >
                                Cancel
                            </button>


                            <button
                                className="danger-btn"
                                onClick={
                                    modal==="history"
                                    ?clearHistory
                                    :removeAccount
                                }
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}