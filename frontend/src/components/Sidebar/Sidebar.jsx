import {
    FaPlus,
    FaComments,
    FaHistory,
    FaCog,
    FaChevronDown,
    FaEllipsisV,
    FaTrashAlt
} from "react-icons/fa";

import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import "./Sidebar.css";

import {useConversations} from "../../hooks/useConversations";
import {useAuth} from "../../context/AuthContext";
import {useConversation} from "../../context/ConversationContext";

import {getMessages} from "../../services/messageService";


export default function Sidebar({open}){

    const {user}=useAuth();

    const {
        conversations,
        removeConversation,
        loadConversations
    }=useConversations();


    const {
        currentConversation,
        setCurrentConversation,
        setChatMessages,
        setPatientContext,
        startNewChat
    }=useConversation();


    const navigate=useNavigate();


    const [chatsOpen,setChatsOpen]=useState(false);
    const [activeMenu,setActiveMenu]=useState(null);
    const [chatToDelete,setChatToDelete]=useState(null);



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



    const openConversation=async(chat)=>{

        if(!user)
            return;


        try{

            const messages=await getMessages(
                user.uid,
                chat.id
            );


            setCurrentConversation(chat.id);

            setChatMessages(messages);


            setPatientContext(
                chat.patientContext || {
                    duration:"",
                    severity:"",
                    medicine:"",
                    medical_history:"",
                    trigger:"",
                    other_notes:""
                }
            );


            navigate("/chat");


        }
        catch(error){

            console.error(
                "Unable to load chat:",
                error
            );

        }

    };



    const deleteChat=async()=>{

        if(!chatToDelete)
            return;


        try{

            await removeConversation(
                chatToDelete.id
            );


            await loadConversations();


            if(
                currentConversation===chatToDelete.id
            ){

                startNewChat();

            }


            setChatToDelete(null);


        }
        catch(error){

            console.error(
                "Delete failed:",
                error
            );

        }

    };



    return(

        <>


        <aside
            className={
                open
                ?"sidebar"
                :"sidebar closed"
            }
            onClick={()=>setActiveMenu(null)}
        >


            <div className="sidebar__top">


                <button
                    className="sidebar__newChat"
                    onClick={(e)=>{

                        e.stopPropagation();

                        startNewChat();

                        navigate("/chat");

                    }}
                >

                    <FaPlus/>

                    {
                        open &&
                        <span>
                            New Chat
                        </span>
                    }

                </button>



                <nav className="sidebar__menu">


                    <NavLink
                        to="/chat"
                        className="sidebar__link"
                    >

                        <FaComments className="sidebar-icon"/>


                        {
                            open &&
                            <span>
                                Chat
                            </span>
                        }


                    </NavLink>





                    <div className="chat-history">


                        <button
                            className="sidebar__link history-button"
                            onClick={(e)=>{

                                e.stopPropagation();

                                if(open)
                                    setChatsOpen(!chatsOpen);

                            }}
                        >

                            <FaHistory className="sidebar-icon"/>


                            {
                                open &&
                                <span>
                                    History
                                </span>
                            }



                            {
                                open &&
                                <FaChevronDown
                                    className={
                                        chatsOpen
                                        ?"rotate"
                                        :""
                                    }
                                />
                            }


                        </button>





                        {
                            chatsOpen &&
                            open &&

                            <div className="conversation-list">


                            {
                                conversations.length===0 ?

                                <p className="no-chats">
                                    No chats yet
                                </p>


                                :


                                conversations.map(chat=>(


                                    <div
                                        key={chat.id}
                                        className={
                                            currentConversation===chat.id
                                            ?
                                            "conversation-item active"
                                            :
                                            "conversation-item"
                                        }
                                    >



                                        <div
                                            className="conversation-title"
                                            onClick={()=>
                                                openConversation(chat)
                                            }
                                        >

                                            <FaComments/>


                                            <span>
                                                {chat.title}
                                            </span>


                                        </div>





                                        <div
                                            className="conversation-actions"
                                            onClick={(e)=>
                                                e.stopPropagation()
                                            }
                                        >


                                            <button
                                                className="menu-button"
                                                onClick={()=>{

                                                    setActiveMenu(

                                                        activeMenu===chat.id
                                                        ?
                                                        null
                                                        :
                                                        chat.id

                                                    );

                                                }}
                                            >

                                                <FaEllipsisV/>

                                            </button>





                                            {
                                                activeMenu===chat.id &&


                                                <div
                                                    className="conversation-menu"
                                                >


                                                    <button
                                                        className="delete-option"
                                                        onClick={()=>{

                                                            setChatToDelete(chat);

                                                            setActiveMenu(null);

                                                        }}
                                                    >

                                                        <FaTrashAlt/>

                                                        Delete

                                                    </button>


                                                </div>


                                            }



                                        </div>



                                    </div>


                                ))

                            }


                            </div>


                        }



                    </div>






                    <NavLink
                        to="/settings"
                        className="sidebar__link"
                    >


                        <FaCog className="sidebar-icon"/>


                        {
                            open &&
                            <span>
                                Settings
                            </span>
                        }


                    </NavLink>



                </nav>



            </div>






            <div className="sidebar__bottom">


                <div className="sidebar-profile">


                    {
                        user?.photoURL ?


                        <img
                            src={user.photoURL}
                            alt="profile"
                        />


                        :


                        <div className="profile-initials">

                            {
                                getInitials(
                                    user?.displayName
                                )
                            }

                        </div>


                    }




                    {
                        open &&


                        <div className="sidebar-profile-info">


                            <span>

                                {
                                    user?.displayName ||
                                    "User"
                                }

                            </span>


                            <small>

                                {
                                    user?.email
                                }

                            </small>


                        </div>

                    }



                </div>


            </div>



        </aside>






        {
            chatToDelete &&


            <div
                className="delete-modal-overlay"
                onClick={()=>
                    setChatToDelete(null)
                }
            >


                <div
                    className="delete-modal"
                    onClick={(e)=>
                        e.stopPropagation()
                    }
                >


                    <h3>
                        Delete Conversation?
                    </h3>


                    <p>
                        This conversation will be permanently deleted.
                    </p>




                    <div className="delete-modal-actions">


                        <button
                            className="cancel-delete"
                            onClick={()=>
                                setChatToDelete(null)
                            }
                        >

                            Cancel

                        </button>




                        <button
                            className="confirm-delete"
                            onClick={deleteChat}
                        >

                            Delete

                        </button>


                    </div>



                </div>


            </div>


        }



        </>

    );

}