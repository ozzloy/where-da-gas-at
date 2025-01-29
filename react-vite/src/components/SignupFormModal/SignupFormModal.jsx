import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setSignedUp } = useModal();

  useEffect(() => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required!";
    }
    if (nick.length <= 0) {
      errors.nick = "Nick cannot be empty!";
    }
    if (name.length <= 0) {
      errors.name = "Name cannot be empty";
    }
  }, [email, nick, name]);

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
        nick,
        password,
        name,
      }),
    );

    if (serverResponse.type === "session/signup/rejected") {
      setErrors(serverResponse.payload);
    } else {
      setSignedUp(true);
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
              Nickname
              <input
                type="text"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                required
              />
            </label>
            {errors.nick && <p>{errors.nick}</p>}
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            {errors.name && <p>{errors.name}</p>}
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
            {errors.confirmPassword && (
              <p>{errors.confirmPassword}</p>
            )}
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
