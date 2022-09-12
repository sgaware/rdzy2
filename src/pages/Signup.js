import Base from "../components/Base";
import { Container, FormGroup, Label } from "reactstrap";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Signup = () => {
  const REGISTERURL =
    "http://rideezy-env.eba-ipiwpram.ap-south-1.elasticbeanstalk.com/api/v1/auth/register";
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validateRegister = Yup.object().shape({
    firstName: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    address: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
  });

  const register = async (data) => {
    let response = await axios({ method: "post", url: REGISTERURL, data });
  };
  return (
    <Base>
      <Container className="d-flex align-item-center justify-content-center">
        <div className="login" style={{ marginTop: "30px" }}>
          <div>
            <h3>Fill Information to Register !</h3>
            <div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  mobile: "",
                  address: "",
                  gender: "",
                }}
                validationSchema={validateRegister}
                onSubmit={(values, { resetForm }) => {
                  register(values);
                  //   resetForm();
                  console.log(values, "Asdasd");
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Label for="firstName" className="label">
                      Enter First Name
                    </Label>
                    <FormGroup>
                      <Field name="firstName" className="input" />
                      {touched.firstName && errors.firstName && (
                        <div style={{ color: "red" }}>{errors.firstName}</div>
                      )}
                    </FormGroup>
                    <Label for="lastName" className="label">
                      Enter Last Name
                    </Label>
                    <FormGroup>
                      <Field name="lastName" className="input" />
                      {touched.lastName && errors.lastName && (
                        <div style={{ color: "red" }}>{errors.lastName}</div>
                      )}
                    </FormGroup>
                    <Label for="email" className="label">
                      Enter Email
                    </Label>
                    <FormGroup>
                      <Field
                        name="email"
                        className="input"
                        autocomplete="off"
                      />
                      {touched.email && errors.email && (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      )}
                    </FormGroup>
                    <Label for="password" className="label">
                      Enter Password
                    </Label>
                    <FormGroup>
                      <Field
                        name="password"
                        type="password"
                        className="input"
                      />
                      {touched.password && errors.password && (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      )}
                    </FormGroup>
                    <Label for="mobile" className="label">
                      Enter Mobile No
                    </Label>
                    <FormGroup>
                      <Field name="mobile" className="input" />
                      {touched.mobile && errors.mobile && (
                        <div style={{ color: "red" }}>{errors.mobile}</div>
                      )}
                    </FormGroup>
                    <Label for="address" className="label">
                      Enter Address
                    </Label>
                    <FormGroup>
                      <Field
                        name="address"
                        rows="4"
                        cols="50"
                        className="input"
                      />
                      {touched.address && errors.address && (
                        <div style={{ color: "red" }}>{errors.address}</div>
                      )}
                    </FormGroup>

                    <Label for="gender" className="label">
                      Enter Gender
                    </Label>
                    <FormGroup>
                      <Field name="gender" className="input" />
                      {touched.gender && errors.gender && (
                        <div style={{ color: "red" }}>{errors.gender}</div>
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

export default Signup;
