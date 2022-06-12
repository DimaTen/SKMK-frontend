import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_.]{3,23}$/;
const PHONE_REGEX = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;
const NAME_REGEX = /^[a-zA-Z]{2,40}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const REGISTER_URL = '/api/auth/signup';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const[firstname, setFirstname] = useState('');
    const[validFirstname, setValidFirstname] = useState('');
    const[firstnameFocus, setFirstnameFocus] = useState('');

    const[lastname, setLastname] = useState('');
    const[validLastname, setValidLastname] = useState('');
    const[lastnameFocus, setLastnameFocus] = useState('');

    const[grade, setGrade] = useState('G1');
    const[gradeFocus, setGradeFocus] = useState('');

    const[phoneNumber, setPhoneNumber] = useState('');
    const[validPhoneNumber, setValidPhoneNumber] = useState('');
    const[phoneNumberFocus, setPhoneNumberFocus] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [email])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidFirstname(NAME_REGEX.test(firstname))
    },[firstname])

    useEffect(() => {
        setValidLastname(NAME_REGEX.test(lastname))
    },[lastname])

    useEffect(() => {
        setValidPhoneNumber(PHONE_REGEX.test(phoneNumber))
    },[phoneNumber])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword, firstname, lastname, grade, phoneNumber])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = NAME_REGEX.test(firstname);
        const v5 = NAME_REGEX.test(lastname);        
        const v6 = PHONE_REGEX.test(phoneNumber);
        

        if ( !v1 ||!v2 || !v3 || !v4 || !v5 || !v6) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: username, 
                    password: password, 
                    email: email, 
                    firstname: firstname, 
                    lastname: lastname,
                    grade: grade,
                    phoneNumber: phoneNumber, 
                    roles: "USER"}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUsername('');
            setEmail('');
            setPassword('');
            setMatchPassword('');
            setFirstname('');
            setLastname('');
            setGrade('G1');
            setPhoneNumber('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    const handleGradeChange = (e) => {
        setGrade(e.target.value)
    }

    return (
        <main className="MainContent">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register new instructor</h1>
                    <form className= "postForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value) && setUsername('Hello')}
                           
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter correct email.<br />
                            
                        </p>

                        <label htmlFor="grade">
                            Grade:
                        </label>
                        <select value={grade} onChange={handleGradeChange}>
                            <option value="G1">Graduate 1</option>
                            <option value="G2">Graduate 2</option>
                            <option value="G3">Graduate 3</option>
                            <option value="G4">Graduate 4</option>
                            <option value="G5">Graduate 5</option>
                        </select>
                        <p id="uidnote" className={gradeFocus && grade && null ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Choose grade.<br />
                            
                        </p>

                        <label htmlFor="firstname">
                            First name:
                            <FontAwesomeIcon icon={faCheck} className={validFirstname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstname || !firstname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            autoComplete="off"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                            aria-invalid={validFirstname ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFirstnameFocus(true)}
                            onBlur={() => setFirstnameFocus(false)}
                        />
                        <p id="uidnote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter correct first name.<br />                           
                        </p>

                        <label htmlFor="lastname">
                            Last name:
                            <FontAwesomeIcon icon={faCheck} className={validLastname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastname || !lastname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            autoComplete="off"
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                            aria-invalid={validLastname ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setLastnameFocus(true)}
                            onBlur={() => setLastnameFocus(false)}
                        />
                        <p id="uidnote" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter correct Last name.<br />                           
                        </p>

                        
                        <label htmlFor="phonenumber">
                            Phone number:
                            <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phonenumber"
                            autoComplete="off"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            required
                            aria-invalid={validPhoneNumber ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setPhoneNumberFocus(true)}
                            onBlur={() => setPhoneNumberFocus(false)}
                        />
                        <p id="uidnote" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter correct Phone number.<br />                           
                        </p>





                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validEmail || !validPassword || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="login">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </main>
    )
}

export default Register