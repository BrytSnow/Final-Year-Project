import "./LoginPage.css";

import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import AuthIllustration from "../../components/Auth/AuthIllustration/AuthIllustration";

export default function LoginPage() {

    return (

        <div className="login-page">

            <div className="login-page__left">

                <LoginForm />

            </div>

            <div className="login-page__right">

                <AuthIllustration />

            </div>

        </div>

    );

}