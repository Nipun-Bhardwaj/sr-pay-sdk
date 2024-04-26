import axios from 'axios';

export const createOrderData = async (
  formData:any,
  setFrameURL:(string:any)=>any,
  setErrorResponse:(string:any)=>any,
  setError:(bool:any)=>any
  ) =>
  {
    let { billingAddress,billingAddressTwo, email, username, phone, city, state, postalCode, country, amount, currency, merchantId } = formData;

    let dialCode = phone?.dialCode;
    const phoneNumber = phone?.phoneNumber

     if(dialCode && dialCode[0] !== '+') dialCode = '+' + dialCode;

    const payload = {
        payment: {
            amount: amount,
            currency: currency,
            paymentType: "Recurring",
            description: ""
        },
        customer: {
            email: email,
            name: username,
            phone: {
                countryCode: dialCode,
                number: phoneNumber
            },
            address: {
                addressLine1: billingAddress,
                addressLine2: billingAddressTwo,
                city: city,
                state: state,
                zip: postalCode,
                country: country
            }
        },
        merchant: {
            merchantId : merchantId,
            referenceId: "23323232",
            redirectUrl: ""
        },
        ipAddress: "90.197.169.245",
        metaData: {
            couponCode: "NY2018"
        }
    }

    let auth;

    if(merchantId === "998877"){
        auth = "5dbe52e7-e16b-4eda-b2ad-cff2d27cb7da";
    }
    else if(merchantId === "swipeluxMerchant"){
        auth = "db36aeee-8fb1-4f3c-bf01-7c0a19bfd980";
    }

    const header = {
        Authorization: `Bearer ${auth}`
    }

    try {
      const response = await axios.post(`https://srpsppg.com/order`, payload, { headers: header });
      setFrameURL(response.data.redirectUrl);
    } catch (error:any) {
      setError(true)
      if(error.response?.data?.error?.message)
        setErrorResponse(error.response.data.error.message);
    }
};