import React from 'react'
import "./Login.css"
import { useFormik } from "formik"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Config } from "../config/Config"
import { useState } from 'react'
import { Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(false)

    const login = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },

        validate: (values) => {
            const errors = {}

            if (!values.userName) {
                errors.userName = "Please enter the userName"
            }
            else if (values.userName.length <= 3 || values.userName.length >= 15) {
                errors.userName = "Please enter the 4 to 15 characters"
            }
           
            if (!values.password) {
                errors.password = "Please enter the password"
            }
            else if (values.password.length <= 3 || values.password.length >= 15) {
                errors.password = "Please enter the 4 to 15 password"
            }
            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true)
                const user = await axios.post(check ? `${Config.api}/loginAdmin` : `${Config.api}/loginuser`, values)

                localStorage.setItem("book", user.data.token)

                if (user.data.message === "success") {
                    setLoading(false)
                    const dashboard = check ? navigate("/view") : navigate("/userDashboard")
                    login.resetForm()
                } else {
                    setLoading(false)
                    alert(user.data.message)
                }
               
            } catch (error) {
                alert("something went wrong")
            }
        }
    })

    const checkbox = () => {
        setCheck(!check)
    }

    

    return (
        <>
            <div className='container login'>
               
                <div className="col-lg-4 col-md-6 col-12 mx-auto">


                    <form onSubmit={login.handleSubmit} className="loginform">

                        <div class="mb-3 text-center">
                            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Login Form</h5>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">username</label>
                            <input
                                name="userName"
                                type={"text"}
                                id="staticEmail2"
                                onChange={login.handleChange}
                                onBlur={login.handleBlur}
                                value={login.values.userName}
                                class={`form-control
                            ${login.errors.userName ? "errors-box" : ""}
                            ${login.touched.userName && !login.errors.userName ? "success-box" : ""}`
                                }
                                />
                            {
                                login.errors.userName ? <span className='errortext'>{login.errors.userName}</span> : null
                            }
                        </div>

                        <div className="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                id="inputPassword2"
                                onBlur={login.handleBlur}
                                onChange={login.handleChange}
                                value={login.values.password}
                                class={`form-control 
                            ${login.errors.password ? "errors-box" : ""}
                            ${login.touched.password && !login.errors.password ? "success-box" : ""}`
                                }
                                />
                            {
                                login.errors.password ? <span className='errortext'>{login.errors.password}</span> : null
                            }
                        </div>

                        <div className='text-center form-floating'>
                            <input class={"form-check-input"}
                                type="checkbox"
                                checked={check}
                                onChange={checkbox}
                                value="" id="flexCheckDefault"
                                />
                            <span>
                                <label class="form-check-label mx-2" for="flexCheckDefault">If you are admin?</label>
                            </span>
                        </div>

                        <div className='col-lg-12 text-center form-floating mt-2 mb-2 link'>
                            <div className='col-lg-4 mx-auto form-floating mt-3 '>
                                <Link to="/register">Register Here</Link>
                            </div>
                        </div>

                        <div className="col-lg-12" style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                            <button className="btn btn-primary  col-lg-12 logbtn mx-auto"
                                type={"submit"}> Login </button>
                        </div>

                    </form >
                   
                </div>

            </div >
          


        </>
    )
}

export default Login