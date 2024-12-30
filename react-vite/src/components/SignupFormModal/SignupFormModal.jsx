import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {}
    if (!email) {
      errors.email = 'Email is required!';
    }
    if (user.length <= 0) {
      errors.user = 'User cannot be empty!'
    }
  },[email, user])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        user,
        password,
      })
    );

    if (serverResponse.type === "session/signup/rejected") {
      setErrors(serverResponse.payload);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="signup-header">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
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
          Username
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </label>
        {errors.user && <p>{errors.user}</p>}
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="submit">Sign Up</button>
            </div>
        </form>
        </div>
    </>
  );
}

export default SignupFormModal;
