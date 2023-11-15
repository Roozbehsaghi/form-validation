import { useState } from "react";
import "./style.css";

const Form = () => {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    password: "",
    condition: false,
  });

  const [error, seterror] = useState<string | null>("");

  const submit = (evt: any) => {
    evt.preventDefault();
    validation();
  };

  const handleBlur = (evt: any) => {
    const target = evt.currentTarget;
    const value = evt.target.value;
    const name = evt.target.name;

    setFormInput({
      ...formInput,
      [name]: target.type === "checkbox" ? target.checked : value,
    });

    validation();
  };

  const validation = () => {
    const newError =
      formInput.firstName === ""
        ? " first name should not be empty"
        : formInput.lastName === ""
        ? " last name should not be empty"
        : formInput.password.length < 8 && formInput.password.length > 0
        ? " password must contain greater than or equal to 8 characters."
        : formInput.password === ""
        ? " password should not be empty"
        : null;

    if (newError !== error) {
      seterror(newError);
    } else if (newError === null) {
      seterror(" thank you for filling the form");
      setFormInput((formInput) => ({ ...formInput, condition: true }));
    }
  };

  return (
    <div className="main">
      <form onSubmit={submit}>
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            name="firstName"
            value={formInput.firstName}
            onChange={handleBlur}
            placeholder="First Name"
          />
        </label>

        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            value={formInput.lastName}
            onChange={handleBlur}
            placeholder="Last Name"
          />
        </label>
        <label htmlFor="checkbox">
          <input type="checkbox" name="condition" onChange={handleBlur} />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="fname"
            onBlur={handleBlur}
            type="text"
            name="password"
            placeholder="Password"
            value={formInput.password}
            onChange={handleBlur}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className={formInput.condition === true ? "errorOff" : "errorOn"}>
        {error}
      </div>
    </div>
  );
};

export default Form;
