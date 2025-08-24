
import React from 'react';
import IconPhone from './icons/IconPhone';
import IconEmail from './icons/IconEmail';
import IconInfo from './contact/IconInfo';
import { Controller, useForm } from 'react-hook-form';
import FormElement from './contact/FormElement';
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';

function Contact() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // 1. Send email to admin
      const adminResult = await emailjs.send(
        'service_z4i0xo4',          // Your EmailJS service ID
        'template_e4d3mmd',        // Admin template ID
        {
          user_name: data.name,
          user_email: data.email,
          user_message: data.message,
        },
        'uVjLs6QkaX8qxAuck'         // Your public key
      );

      // 2. Send auto-reply to user
      const userAutoReply = await emailjs.send(
        'service_z4i0xo4',
        'template_astuygm',      // Replace with your user auto-reply template ID
        {
          user_name: data.name,
          user_email: data.email,
        },
        'uVjLs6QkaX8qxAuck'
      );

      console.log('Admin Email Result:', adminResult.text);
      console.log('User Auto-reply Result:', userAutoReply.text);

      toast.success('Message sent successfully!');
      reset();

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Try again.');
    }
  };

  return (
    <div>
      <div className="x1:container mx-auto mb-32">
        <div
          className="flex justify-center"
          style={{
            background: 'radial-gradient(circle, #1e40af 40%, #3b82f6 100%)',
            height: '250px',
          }}
        ></div>

        <div className="px-4 sm:w-2/3 lg:w-1/2 mx-auto">
          <div className="rounded-lg shadow-lg bg-white -mt-24 py-10 md:py-12 px-4 md:px-6">

            {/* <div className="grid grid-cols-2 gap-x-6 mb-12 max-auto">
              <IconInfo icon={<IconEmail />} text={<span className="text-blue-500">protonpdf6795@yopmail.com</span>} />
              <IconInfo icon={<IconPhone />} text={<span className="text-blue-500">+91 7567654387</span>} />
            </div> */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 mx-auto">
  <IconInfo 
    icon={<IconEmail />} 
    text={<span className="text-blue-500 break-all">protonpdf6795@yopmail.com</span>} 
  />
  <IconInfo 
    icon={<IconPhone />} 
    text={<span className="text-blue-500">+91 7567654387</span>} 
  />
</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type="text"
                    label="Name"
                    placeholder="Enter name here..."
                    fieldRef={field}
                    hasError={errors.name?.type === 'required'}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type="email"
                    label="Email"
                    placeholder="Enter email here..."
                    fieldRef={field}
                    hasError={errors.email?.type === 'required'}
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormElement
                    type="textarea"
                    label="Message"
                    placeholder="Enter message here..."
                    fieldRef={field}
                    hasError={errors.message?.type === 'required'}
                  />
                )}
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-800 text-white font-medium uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-800 focus:outline-none focus:ring-0 active:bg-blue-800"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

