import Base from "../components/Base";
import { Container, FormGroup, Label } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const LOGINURL =
    "http://rideezy-env.eba-ipiwpram.ap-south-1.elasticbeanstalk.com/api/v1/auth/login";
  const navigate = useNavigate();

  const validate = Yup.object().shape({
    username: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
  });
  const login = async (data) => {
    let response = await axios({ method: "post", url: LOGINURL, data });
    if (response) {
      localStorage.setItem("data", JSON.stringify(response?.data));
      navigate("/user/dashboard");
      // localStorage.setItem("user", JSON.stringify(user));
    }
  };
  const clearForm = () => {};
  return (
    <Base>
      <Container className="main">
        <div className="login">
          <div>
            <h3>Login Here </h3>
            <div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                  login(values);
                  resetForm();
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Label for="username" className="label">
                      Email
                    </Label>
                    <FormGroup>
                      <Field
                        name="username"
                        className="input"
                        autocomplete="off"
                      />
                      {touched.username && errors.username && (
                        <div style={{ color: "red" }}>{errors.username}</div>
                      )}
                    </FormGroup>

                    <Label for="password" className="label">
                      Password
                    </Label>
                    <FormGroup>
                      <Field
                        name="password"
                        type="password"
                        className="input"
                        autocomplete="off"
                      />
                      {touched.password && errors.password && (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      )}
                    </FormGroup>

                    <button type="submit" className="loginBtn">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Container>
    </Base>
  );
};

export default Login;
