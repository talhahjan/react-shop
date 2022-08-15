import { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone";
import { useProfile } from "../../hooks/fetchData";
import CountryList from "../../hooks/countryList";
import { useUpdateProfile } from "../../hooks/fetchData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Profile() {
  const { isLoading, data, isError, error } = useProfile();

  useEffect(() => {
    return () => {};
  }, []);

  if (isLoading) {
    return "<span>loading ... </span>";
  }

  if (!isLoading && isError) {
    <spam>eroror {error}</spam>;
  }

  // const { data: user } = data;
  const user = data;
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required!"),
    first_name: Yup.string().required("Required!").min(3).max(12),
    last_name: Yup.string().nullable(),
    mobile: Yup.string().phone().nullable(),
    address: Yup.string().nullable(),
    country: Yup.string().nullable(),
    state: Yup.string().nullable("Please Enter State/Province"),
  });

  const initialValues = {
    first_name: user.profile.first_name,
    last_name: user.profile.last_name,
    email: user.email,
    mobile: user.profile.phone,
    address: user.profile.address,
    country: user.profile.country,
    state: user.profile.state,
  };

  return (
    <main className="page-user-profile">
      <div className="header"></div>
      <div className="card-profile">
        <div className="profile-image">
          <img
            className="shadow"
            referrerPolicy={
              user.profile.avatar.includes("googleusercontent.com")
                ? "no-referrer"
                : null
            }
            src={user.profile.avatar}
            alt=""
          />
        </div>
        <div className="profile-content">
          <div className="profile-name">
            <div className="name">{`${user.profile.first_name} ${user.profile.last_name}`}</div>
            <div className="role">
              Web Developer from
              <strong>
                <MdLocationOn className="d-inline" />
                {user.profile.state}, {user.profile.country}
              </strong>
            </div>
          </div>
          <div className="profile-info">
            <LoginForm
              initialValues={initialValues}
              validationSchema={validationSchema}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

const LoginForm = ({ initialValues, validationSchema }) => {
  const { mutate } = useUpdateProfile();
  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {(formik) => {
          return (
            <Form noValidate>
              <div className="container">
                <h6>Personel Information</h6>
                <hr />

                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="my-2 ">
                      <label htmlFor="last_name" className="form-label">
                        Last Name
                      </label>
                      <Field
                        type="first_name"
                        name="first_name"
                        id="first_name"
                        className="form-control"
                        placeholder="Enter First Name"
                        aria-label="first_name"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="first_name" />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="my-2">
                      <label htmlFor="last_name" className="form-label">
                        Last Name
                      </label>
                      <Field
                        type="last_name"
                        name="last_name"
                        id="last_name"
                        className="form-control"
                        placeholder="Enter Lasst Name"
                        aria-label="last_name"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="last_name" />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <h6>Contact Information</h6>
                  <hr />
                  <div className="col-lg-6 col-md-12">
                    <div className="my-2">
                      <label htmlFor="state" className="form-label">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter Email-Address"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="my-2">
                      <label htmlFor="mobile" className="form-label">
                        Moblie #
                      </label>
                      <Field
                        type="mobile"
                        name="mobile"
                        id="mobile"
                        className="form-control"
                        placeholder="Enter Your Mobie Number"
                        aria-label="mobile"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="mobile" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="my-2">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <Field
                        as="select"
                        name="country"
                        id="country"
                        className="form-control"
                        aria-label="country"
                        aria-describedby="basic-addon1"
                      >
                        <option defaultValue="">Select Country</option>
                        {CountryList.map((curItem, index) => {
                          return (
                            <option key={index} value={curItem.name}>
                              {curItem.name}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="country" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="my-2">
                      <label htmlFor="state" className="form-label">
                        State/Province
                      </label>
                      <Field
                        type="state"
                        name="state"
                        id="state"
                        className="form-control"
                        placeholder="Enter State/Province"
                        aria-label="state"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="state" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="my-2">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      id="address"
                      className="form-control"
                      placeholder="Enter address"
                      aria-label="address"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="fs-9 text-danger">
                    <ErrorMessage name="address" />
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn btn-primary"
                    id="submitBtn"
                    type="submit"
                  >
                    Save changes
                    <span className="d-none ml-2" id="dots">
                      ...
                      <img src="/spinner.gif" width="25" height="25" alt="" />
                    </span>
                  </button>
                  <button className="btn btn-primary" type="reset">
                    Reset
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </>
  );
};
