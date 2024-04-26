import React,{useEffect, useState} from 'react'
import ButtonCTA from "./ButtonCTA";
import Select from "react-select";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {  Controller } from 'react-hook-form'
import { createOrderData } from './createOrderAxiosData'

type FormValues = {
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

  interface FormProps {
    form : any;
  }

const CreateOrderForm : React.FC<FormProps> = ({form}) => {

      const [frameURL,setFrameURL] = useState<string>();
      const [errorResponse,setErrorResponse] = useState("");
      const [error,setError] = useState(false);

      const currencyOptions = [
        { value: 'USD', label: 'USD' },
        { value: 'AED', label: 'AED' },
        { value: 'CAD', label: 'CAD' }
      ]
      
      const merchantIdOptions = [
        { value: 'swipeluxMerchant', label: 'SwipeLux' },
        { value: '998877', label: 'CCAVENUE' },
      ]

      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control
      } = form;
    
      const onSubmit = async (formData: FormValues) => {
          const trimmedFormData = {
            ...formData
          };
          createOrderData(trimmedFormData,setFrameURL,setErrorResponse,setError);
      };

      const handlePhoneChange = (value: string, data: any) => {
    
        const phoneNumber = value.replace(data.dialCode, '');
    
        setValue("phone.dialCode", data.dialCode);
        setValue("phone.phoneNumber", phoneNumber);
      };
    

    return (
        <form className="row" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="col-md-6">
        <div className="field mb-3">
          <input
            className={errors.username ? "form_error" : ""}
            type="text"
            autoComplete="off"
            id="username"
            {...register("username")}
          />
          <label
            htmlFor="username"
            title="Enter full name"
            data-title="Enter full name"
          ></label>
        </div>
      </div>
        <div className="col-md-6">
          <div className="field mb-3">
            <input
              type="text"
              required
              autoComplete="off"
              id="email"
            {...register("email")}
            />
            <label
              htmlFor="email"
              title="Enter email address"
              data-title="Enter email address"
            ></label>
            <span className="validation_error">{errors?.email?.message}</span>
          </div>
        </div>
        <div className="col-12">
          <div className="field mb-3">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <>
                  <PhoneInput
                    inputProps={{
                      id : "phone",
                      autoComplete: "off"
                    }}
                     value={`${field?.value?.dialCode}${field?.value?.phoneNumber}`}
                     onChange={(value, data) => handlePhoneChange(value, data)  }
                     country={"US"}
                     inputStyle={{width:"100%"}}
                  />   
               </>
              )}
            />
             
          </div>
        </div>
        <div className="col-12">
          <div className="field mb-3">
            <input
              type="text"
              autoComplete="off"
              id="billingAddress"
            {...register("billingAddress")}
            />
            <label
              htmlFor="billingAddress"
              title="Enter billing address"
              data-title="Enter billing address"
            ></label>
            </div>
            </div>
            <div className="col-12">
          <div className="field mb-3">
            <input
              type="text"
              autoComplete="off"
              id="billingAddressTwo"
            {...register("billingAddressTwo")}
            />
            <label
              htmlFor="billingAddressTwo"
              title="Enter billing Line 2"
              data-title="Enter billing Line 2"
            ></label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="field mb-3">
            <input
              type="text"
              autoComplete="off"
              id="postalCode"
            {...register("postalCode")}
            />
            <label
              htmlFor="postalCode"
              title="Enter pin/postal code"
              data-title="Enter pin/postal code"
            ></label>
          </div>
        </div>
            <div className="col-md-6">
          <div className="field mb-3">
            <input
              type="text"
              autoComplete="off"
              id="country"
            {...register("country")}
            />
            <label
              htmlFor="country"
              title="Select country"
              data-title="Select country"
            ></label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="field mb-3">
            <input
              type="text"
              autoComplete="off"
              name="state"
              id="state"
              {...register("state")}
            />
  
          <label
              htmlFor="state"
              title="Select state"
              data-title="Select state"
            ></label>
          </div>
        </div>      
  
        <div className="col-md-6">
          <div className="field mb-3">
            <input
              type="text"
              autoComplete="off"
              id="city"
              {...register("city")}
            />
            <label
              htmlFor="city"
              title="Select city"
              data-title="Select city"
            ></label>
          </div>
        </div>     
        <div className="col-md-6">
        <div className="field mb-3">
          <input
            className={errors.amount ? "form_error" : ""}
            type="number"
            required
            autoComplete="off"
            id="amount"
            {...register("amount")}
          />
          <label
            htmlFor="amount"
            title="Enter Amount"
            data-title="Enter Amount"
          ></label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="field mb-3">
          <Select options={currencyOptions} 
              styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    boxShadow: "none",
                    border: `2px solid ${errors.currency ? "red" : "#d8d8d8"}`,
                    borderRadius: "8px",
                    height: "47px",
                    fontSize: "16px",
                    color: "#77778d",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    width: "100%",
                    padding: "0.375rem 0.375rem 0.75rem",
                  }),
                  indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    display: "none",
                  }),
                }}
                onChange={(selectedOption) => {
                  if (!selectedOption) {
                    form.setError("currency", {
                      type: "manual",
                      message: "Currency is mandatory",
                    });
                  } else {
                    setValue("currency", selectedOption.value);
                    form.clearErrors("currency");
                  }
                }}
                isSearchable={true}
                isClearable={true}
                placeholder="Select Currency"
              />
        </div>
      </div>
      <div className="col-12">
        <div className="field mb-3">
        <Select options={merchantIdOptions} 
              styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    boxShadow: "none",
                    border: `2px solid ${errors.merchantId ? "red" : "#d8d8d8"}`,
                    borderRadius: "8px",
                    height: "47px",
                    fontSize: "16px",
                    color: "#77778d",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    width: "100%",
                    padding: "0.375rem 0.375rem 0.75rem",
                  }),
                  indicatorSeparator: (baseStyles) => ({
                    ...baseStyles,
                    display: "none",
                  }),
                }}
                onChange={(selectedOption) => {
                  if (!selectedOption) {
                    form.setError("merchantId", {
                      type: "manual",
                      message: "Merchant is mandatory",
                    });
                  } else {
                    setValue("merchantId", selectedOption.value);
                    form.clearErrors("merchantId");
                  }
                }}
                isSearchable={true}
                isClearable={true}
                placeholder="Select Merchant"
              />
        </div>
      </div>       
        <div className="col-12">
          <ButtonCTA
            disabled={false}
            text="Buy Now"
            mobileCTA={false}
          />
        </div>
      </form>
    )
}

export default CreateOrderForm