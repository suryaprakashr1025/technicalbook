import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Config } from "../config/Config"
import "./Register.css"
import { ThreeDots } from "react-loader-spinner"
function Register() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const register = useFormik({
        initialValues: {
            userName: "",
            email: '',
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
            if (!values.email) {
                errors.email = "Please enter your email"
            }
            else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Please enter valid email"
            }

            if (!values.password) {
                errors.password = "Please enter the password"
            }
            else if (values.password.length <= 3 || values.password.length >= 15) {
                errors.password = "Please enter the 4 to 15 characters"
            }
            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true)
                const reg = await axios.post(`${Config.api}/createuser`, values)
                console.log(reg)
                if (reg.data.message === "User created") {
                    setLoading(false)
                    register.resetForm()
                    navigate("/")

                } else {
                    setLoading(false)
                    register.resetForm()
                    alert(reg.data.message)
                }

            } catch (error) {
                console.log(error)
            }
        }

    })



    return (
        <>
            <div className='container register'>


                <div className="col-lg-4 col-md-6 col-12 mx-auto">

                    <form onSubmit={register.handleSubmit} className="registerform">
                        <div class="mb-3 text-center">
                            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Register Form</h5>
                        </div>
                        <div className='row'>
                            <div className='mt-3'>
                                <label>username</label>
                                <input
                                    name="userName"
                                    type="text"
                                    id="staticEmail2"
                                    onChange={register.handleChange}
                                    onBlur={register.handleBlur}
                                    value={register.values.userName}
                                    class={`form-control 
          
            ${register.errors.userName ? "error-box" : ""}
            ${register.touched.userName && !register.errors.userName ? "success-box" : ""}`
                                    }
                                />
                                {
                                    register.errors.userName ? <span className='errortext'>{register.errors.userName}</span> : null
                                }
                            </div>
                        </div>

                        <div className='row'>
                            <div className='mt-3'>
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    id="inputEmail"
                                    onChange={register.handleChange}
                                    onBlur={register.handleBlur}
                                    value={register.values.email}
                                    className={`form-control 
              ${register.errors.email ? "error-box" : ""}
              ${register.touched.email && !register.errors.email ? "success-box" : ""} `}

                                />
                                {
                                    register.errors.email ? <span className='errortext'>{register.errors.email}</span> : null
                                }
                            </div>
                        </div>


                        <div className='row'>
                            <div className='mt-3'>
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    id='inputPassword2'
                                    onChange={register.handleChange}
                                    onBlur={register.handleBlur}
                                    value={register.values.password}
                                    className={`form-control 
          ${register.errors.password ? "error-box" : ""}
          ${register.touched.password && !register.errors.password ? "success-box" : ""}`
                                    }
                                />
                                {
                                    register.errors.password ? <span className='errortext'>{register.errors.password}</span> : null
                                }
                            </div>
                        </div>


                        <div className='col-lg-12 mt-3' style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                            <button type="submit"
                                className={`btn btn-primary  regbtn`} >Register</button>
                        </div>

                        <div className='col-lg-12 text-center form-floating mt-2 mb-2 link'>
                            <div className='col-lg-4 mx-auto form-floating mt-3 '>
                                <Link to="/">Login Here</Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register