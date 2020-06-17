import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { AppContext } from '../context';
import Title from '../components/Title';
import Order from '../components/Checkout/Order';

const CheckoutWrapper = styled.main`
  .row {
    display: flex;
    margin-bottom: 5rem;
  }

  .order-details {
    flex: 4;
    padding-right: 3rem;

    h2 {
      font-weight: lighter;
      color: #333;
    }

    .input-group {
      width: 100%;
      height: 4rem;
      margin: 1.5rem 0;
    }

    .ta {
      min-height: 6rem;
    }

    .name {
      display: flex;
      justify-content: space-between;
    }

    .name .input-field {
      width: 47%;
      display: flex;
      flex-direction: column;
    }

    .input-field {
      height: 100%;
      color: #333;
      font-size: 15px;
    }

    .required label::after {
      content: '*';
      color: red;
    }

    .input-field input {
      width: 100%;
      height: 100%;
      max-height: 2.5rem;
      margin-top: 0.2rem;
      border: 1.2px solid #ccc;
      border-radius: 2px;
      background-color: #fafafa;
      font-size: 15px;
      padding-left: 0.5rem;
    }

    .input-field textarea {
      width: 100%;
      margin-top: 0.2rem;
      border: 1.2px solid #ccc;
      border-radius: 2px;
      background-color: #fafafa;
      font-size: 15px;
    }

    .input-field input:focus,
    .input-field textarea:focus {
      border: 1.2px solid indigo;
    }

    .notes-title {
      margin-top: 3rem;
    }
  }
`;

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const { cart } = useContext(AppContext);
  // console.log(cart);

  const validate = () => {
    const errors = {};

    if (!firstName) errors.firstName = true;
    if (!lastName) errors.lastName = true;
    if (!address) errors.address = true;
    if (!city) errors.city = true;
    if (!zipCode) errors.zipCode = true;
    if (!phoneNumber) errors.phoneNumber = true;
    if (!email) errors.email = true;

    return errors;
  };

  const handleOrder = async (e) => {
    const errors = validate();
    if (Object.keys(errors).length) {
      return setErrors(errors);
    }

    const orderData = {
      orderInfo: {
        firstName,
        lastName,
        company,
        address,
        city,
        zipCode,
        phoneNumber,
        email,
        notes,
      },
      orderItems: [
        ...cart.map((item) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image.split('//')[1],
          },
        })),
      ],
    };
    console.log(orderData);
    const response = await axios.post('/api/orders', orderData);
    console.log(response);
    alert('Поруџбина успешно прослеђена');
  };

  const handleFocus = (inputName) => {
    const updatedErrors = { ...errors };
    updatedErrors[inputName] = false;
    setErrors(updatedErrors);
  };

  return (
    <CheckoutWrapper>
      <Title title='Checkout' />

      <div className='container'>
        <div className='row'>
          <div className='order-details'>
            <h2>Детаљи за наплату</h2>
            <div className='input-group name'>
              <div className='input-field required'>
                <label htmlFor='firstName'>Име</label>
                <input
                  type='text'
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    border: errors.firstName
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('firstName')}
                />
              </div>
              <div className='input-field required'>
                <label htmlFor='lastName'>Презиме</label>
                <input
                  type='text'
                  id='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    border: errors.lastName
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('lastName')}
                />
              </div>
            </div>
            <div className='input-group'>
              <div className='input-field'>
                <label htmlFor='company'>Назив компаније (опционо)</label>
                <input
                  type='text'
                  id='company'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            <div className='input-group required'>
              <div className='input-field'>
                <label htmlFor='address'>Улица и кућни број</label>
                <input
                  type='text'
                  id='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    border: errors.address
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('address')}
                />
              </div>
            </div>
            <div className='input-group required'>
              <div className='input-field'>
                <label htmlFor='city'>Град</label>
                <input
                  type='text'
                  id='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    border: errors.city
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('city')}
                />
              </div>
            </div>
            <div className='input-group required'>
              <div className='input-field'>
                <label htmlFor='zipCode'>Поштански број</label>
                <input
                  type='text'
                  id='zipCode'
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  style={{
                    border: errors.zipCode
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('zipCode')}
                />
              </div>
            </div>
            <div className='input-group required'>
              <div className='input-field'>
                <label htmlFor='phoneNumber'>Телефон </label>
                <input
                  type='text'
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    border: errors.phoneNumber
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('phoneNumber')}
                />
              </div>
            </div>
            <div className='input-group required'>
              <div className='input-field'>
                <label htmlFor='email'>Адреса е-поште</label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    border: errors.email
                      ? '1.2px solid crimson'
                      : '1.2px solid #ccc',
                  }}
                  onFocus={() => handleFocus('email')}
                />
              </div>
            </div>
            <h2 className='notes-title'>Додатне информације</h2>
            <div className='input-group ta'>
              <div className='input-field'>
                <label htmlFor='notes'>Напомене о наруџбини (опционо)</label>
                <textarea
                  rows='5'
                  id='notes'
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Order cart={cart} handleOrder={handleOrder} />
        </div>
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
