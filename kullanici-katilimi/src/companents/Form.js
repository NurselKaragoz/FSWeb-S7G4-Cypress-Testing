import { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
function Form(props) {
  // const { memberAdd } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const hadleSubmit = (e) => {
    e.preventDefault();
    // props.memberAdd(formData);
    console.log("formm submit", formData);
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setFormData(res.data); // get just the form data from the REST api
        console.log("success", res);
      })
      .catch((err) => console.log(err.response));
  };
  const formSchema = Yup.object().shape({
    email: Yup.string().required(),
    terms: Yup.boolean().onbeforeinput([true]),
  });
  const [errors, setErrors] = useState({
    email: "",
    terms: "",
  });

  useEffect(() => {
    console.log("Login Data", formData);
  }, [formData]);

  return (
    <form onSubmit={hadleSubmit}>
      <label htmlFor="user-name">Name</label>
      <input id="user-name" type="text" name="name" onChange={changeHandler} />
      <br />
      <label htmlFor="user-mail">Email</label>
      <input
        id="user-mail"
        type="email"
        name="email"
        onChange={changeHandler}
      />{" "}
      <br />
      <label htmlFor="user-password">Password</label>
      <input
        id="user-password"
        type="text"
        name="password"
        onChange={changeHandler}
      />
      <br />
      <label htmlFor="terms">Terms</label>
      <input
        id="terms"
        type="checkbox"
        name="terms"
        checked={formData.terms}
        onChange={changeHandler}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
