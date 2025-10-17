import { useContext, useState } from 'react'
import assets from '../assets/asset'
import { toast } from "@/lib/utils"
import SubmitButton from '@/components/SubmitButton'
import { useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import val from "@/lib/functions"
import { AuthContext } from "@/contexts/AuthContext"
import { AxiosError } from "axios"

const PasswordRequestPage = () => {
  // Formik data
  const initialValues = { email: "" };
  const validationSchema = Yup.object({
    email: val("email"),
  });

  const [loading, setLoading] = useState(false)
  const { api } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async ({ email }) => {
    setLoading(true)
    try {
      const res = await api.post("/api/v1/password-recovery/request-reset", { email });
      if (res.status === 200 && res.data.success) {
        toast.success(res.data.message)
        toast.success("Check your spam folder for the email if you don't get it immediately", {duration: Infinity})
        navigate('/login')
      }
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Password Reset request failed");
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
          await handleSubmit(data)
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
                    name="email"
                    id="email"
                    type="email"
                    className='p-2 border border-gray-500 rounded-md focus:outline-none'
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="password" component="small" className="text-red-600" />
                </div>
              </div>
              {/* Submit Button */}

              <SubmitButton loading={loading} text='Request password reset' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default PasswordRequestPage