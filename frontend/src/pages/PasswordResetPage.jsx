import { useContext, useState } from 'react'
import assets from '../assets/asset'
import { toast } from "@/lib/utils"
import SubmitButton from '@/components/SubmitButton'
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import val from "@/lib/functions"
import { AuthContext } from "@/contexts/AuthContext"
import { AxiosError } from "axios"

const PasswordResetPage = () => {
 // Formik data
    const initialValues = { password: "", cpassword: "" };
    const validationSchema = Yup.object({
        password: val("password"),
        cpassword: val("cpassword"),
    });
    const params = useParams()

    const { token } = params
    const [loading, setLoading] = useState(false)
    const { api } = useContext(AuthContext)
    const navigate = useNavigate()

    const resetPassword = async ({ password, cpassword }) => {
        setLoading(true)
        try {
            const res = await api.post("/api/v1/password-recovery/reset-password", { password, cpassword, token });
            if (res.status === 200 && res.data.success) {
                toast.success(res.data.message, {duration: 7000})
                navigate('/login')
            }
        } catch (err) {
            console.error(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Password reset failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
        finally {
            setLoading(false)
        }
    };


  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* -------left---------*/}
      <img src={assets.logoIcon} alt='' className='w-[min(30vw,250px)]' />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) =>
          await resetPassword(data)
        }
      >
        <Form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex justify-between items-center whitespace-pre'>
            Reset Password
          </h2>
          <div className="grid gap-6">
            <div className="grid gap-6">
              {/* Email */}
              <div className="grid gap-3">
                <div>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    className='p-2 border border-gray-500 rounded-md focus:outline-none'
                    placeholder='Password'
                  />
                  <ErrorMessage name="password" component="small" className="text-red-600" />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <div>
                  <Field
                    name="cpassword"
                    id="cpassword"
                    type="password"
                    className='p-2 border border-gray-500 rounded-md focus:outline-none'
                    placeholder='Confirm Password'
                  />
                  <ErrorMessage name="cpassword" component="small" className="text-red-600" />
                </div>
              </div>
              {/* Submit Button */}

              <SubmitButton loading={loading} text='Reset Password' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' />
              <p className='text-sm text-gray-300'>Didn't receive the email
                <span className='font-medium text-violet-500 cursor-pointer ml-2' onClick={() => navigate('/password-request')}>Resend reset link</span>
              </p>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default PasswordResetPage