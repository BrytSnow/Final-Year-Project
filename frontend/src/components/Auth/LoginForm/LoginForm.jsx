import "./LoginForm.css";
import {Link,useNavigate} from "react-router-dom";
import {FiMail,FiLock,FiEye,FiEyeOff} from "react-icons/fi";
import {useState} from "react";
import GoogleButton from "../GoogleButton/GoogleButton";
import {
    loginUser,
    forgotPassword
} from "../../../firebase/auth";
import {sendEmailVerification} from "firebase/auth";

export default function LoginForm(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    const [unverifiedUser,setUnverifiedUser]=useState(null);

    const navigate=useNavigate();

    const handleLogin=async(e)=>{

        e.preventDefault();

        setError("");
        setMessage("");
        setUnverifiedUser(null);

        try{

            const user=await loginUser(
                email,
                password
            );

            await user.reload();

            if(!user.emailVerified){

                setUnverifiedUser(user);

                setError(
                    "Please verify your email before signing in."
                );

                return;

            }

            navigate("/chat");

        }catch(err){

            setError(
                err.message
            );

        }

    };

    const resendVerification=async()=>{

        try{

            await sendEmailVerification(
                unverifiedUser
            );

            setMessage(
                "Verification email sent. Please check your inbox."
            );

            setError("");

        }catch{

            setError(
                "Unable to send verification email."
            );

        }

    };

    const handleForgotPassword=async()=>{

        setError("");
        setMessage("");

        if(!email){

            setError(
                "Enter your email address first."
            );

            return;

        }

        try{

            await forgotPassword(email);

            setMessage(
                "Password reset email sent. Please check your inbox."
            );

        }catch(err){

            setError(
                err.message
            );

        }

    };

    return(

        <div className="login-form">

            <h2>Welcome Back</h2>

            <p className="login-form__subtitle">
                Sign in to continue
            </p>

            <form onSubmit={handleLogin}>

                <div className="input-group">

                    <FiMail className="input-icon"/>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        required
                    />

                </div>

                <div className="input-group">

                    <FiLock className="input-icon"/>

                    <input
                        type={showPassword?"text":"password"}
                        placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={()=>setShowPassword(!showPassword)}
                    >
                        {showPassword?<FiEyeOff/>:<FiEye/>}
                    </button>

                </div>

                <div className="forgot-password">

                    <button
                        type="button"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>

                </div>

                {error&&(
                    <p className="error">
                        {error}
                    </p>
                )}

                {message&&(
                    <p className="success">
                        {message}
                    </p>
                )}

                {unverifiedUser&&(
                    <button
                        type="button"
                        className="resend-btn"
                        onClick={resendVerification}
                    >
                        Resend Verification Email
                    </button>
                )}

                <button
                    className="signin-btn"
                    type="submit"
                >
                    Sign In
                </button>

            </form>

            <div className="divider">

                <span>
                    or continue with
                </span>

            </div>

            <GoogleButton/>

            <p className="register-link">

                Don't have an account?

                <Link to="/register">
                    Register
                </Link>

            </p>

        </div>

    );

}