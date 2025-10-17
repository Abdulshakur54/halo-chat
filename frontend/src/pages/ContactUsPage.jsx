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
import ReCAPTCHA from "react-google-recaptcha";
const recapthaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const ContactUsPage = () => {
  const [loading, setLoading] = useState(false)
  const { api } = useContext(AuthContext)
  const navigate = useNavigate()
  const [recaptchaVerified, setRecaptchaVerified] = useState(false)
  const [recaptchaRsp, setRecaptchaRsp] = useState(null)

  // Formik data
  const initialValues = { fullName: "", email: "", message: "" };
  const validationSchema = Yup.object({
    fullName: val('fullname'),
    email: val("email"),
    message: val("text"),
  });


  const contactUs = async ({ fullName, email, message }) => {
    if (recaptchaVerified) {
      setLoading(true)
      try {
        const res = await api.post("/api/v1/public/contactus", { fullName, email, message, captchaData: recaptchaRsp });
        if (res.status === 200) {
          toast.success(res.data.message)
          toast.success('Do you check your spam folder for our automated response if not found in your Inbox', {duration: 10000})
          navigate('/')
        }
      } catch (err) {
        console.error(err);
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Message not sent");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
      finally {
        setLoading(false)
        setRecaptchaVerified(false)
      }
    } else {
      toast.error("Kindly confirm you aren't a robot");
    }
  };
  const verified = (value) => {
    setRecaptchaVerified(true)
    setRecaptchaRsp(value)
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* -------left---------*/}
      <img src={assets.logoIcon} alt='' className='w-[min(30vw,250px)]' />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) =>
          await contactUs(data)
        }
      >
        <Form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex justify-between items-center whitespace-pre'>
            Contact Us
          </h2>
          <div className="grid gap-6">
            <div className="grid gap-6">
              {/* Email */}
              <div className="grid gap-3">
                <div>
                  <Field
                    name="fullName"
                    id="fullName"
                    type="text"
                    className='p-2 border border-gray-500 rounded-md focus:outline-none w-full'
                    placeholder="Enter your fullname"
                  />
                  <ErrorMessage name="password" component="small" className="text-red-600" />
                </div>
                <div>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    className='p-2 border border-gray-500 rounded-md focus:outline-none w-full'
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="password" component="small" className="text-red-600" />
                </div>
                <div>
                  <Field
                    name="message"
                    id="message"
                    className='p-2 border border-gray-500 rounded-md focus:outline-none w-full'
                    placeholder="Enter your message"
                    as='textarea'
                  />
                  <ErrorMessage name="password" component="small" className="text-red-600" />
                </div>
              </div>
              <ReCAPTCHA
                sitekey={recapthaSiteKey}
                onChange={verified}
              />
              {/* Submit Button */}

              <SubmitButton loading={loading} text='Send' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ContactUsPage