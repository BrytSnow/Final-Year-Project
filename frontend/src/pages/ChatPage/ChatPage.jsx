import "./ChatPage.css";

import Layout from "../../components/Layout/Layout";
import ChatContainer from "../../components/ChatContainer/ChatContainer";

export default function ChatPage({
    theme,
    toggleTheme
}) {

    return (

        <Layout
            theme={theme}
            toggleTheme={toggleTheme}
        >

            <ChatContainer />

        </Layout>

    );

}