import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const disablebtn = email.length <= 0 || password.length <= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse.type === "session/login/rejected") {
      setErrors(serverResponse.payload);
    }

    if (serverResponse.type === "session/login/fulfilled") {
      closeModal();
    }
  };

  return (
    <>
      <div className="header">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        
        <button disabled={disablebtn} type="submit">Log In</button>

        <button className="demo_btn" onClick={() => {
          setEmail('demo@example.com');
          setPassword('password')
            }}>Demo User</button>
            </div>
        </form>
        </div>
    </>
  );
}

export default LoginFormModal;
