import React, { useEffect, useState } from 'react'
import 'react-phone-input-2/lib/style.css'
import {  useForm } from 'react-hook-form'
import CreateOrderForm from './CreateOrderForm';
import ButtonCTA from './ButtonCTA';
import { createOrderData } from './createOrderAxiosData';

interface FormValues  {
    username: string;
    email: string;
    billingAddress: string;
    billingAddressTwo: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: {
      dialCode: string;
      phoneNumber: string;
    };
    currency: string;
    amount: number;
    merchantId: string
  };

const CreateOrder = () => {

    const userForm = useForm<FormValues>();
    const { handleSubmit,formState: { errors }, } = userForm;
    const [isMounted, setIsMounted] = useState(false);
    const [frameURL,setFrameURL] = useState<string>();
    const [errorResponse,setErrorResponse] = useState("");
    const [error,setError] = useState(false);
  
    useEffect(() => setIsMounted(true), []);

    const onSubmit = async (formData: FormValues) => {
      const trimmedFormData = {
        ...formData
      };
      createOrderData(trimmedFormData,setFrameURL,setErrorResponse,setError);
  };

    return (
      isMounted ?
      <>
        <div className="card p-4 h-100">
            <CreateOrderForm form={userForm}/>
        </div>
        <form className="container_mobile_cta" onSubmit={handleSubmit(onSubmit)}>
        <div className="mobile_cta d-lg-none container px-md-5">
          <ButtonCTA disabled={false} text="Buy Now" mobileCTA={true} />
        </div>
        </form>
      </>:
    null
    );
}

export default CreateOrder