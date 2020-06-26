import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { AppContext } from '../context';
import Title from '../components/Global/Title';
import Message from '../components/Global/Message';
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

    .input-field {
      width: 47%;
      display: flex;
      flex-direction: column;
    }
  }

  .input-field {
    height: 100%;
    color: #333;
    font-size: 15px;

    input {
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

    textarea {
      width: 100%;
      margin-top: 0.2rem;
      border: 1.2px solid #ccc;
      border-radius: 2px;
      background-color: #fafafa;
      font-size: 15px;
    }

    input:focus,
    textarea:focus {
      border: 1.2px solid indigo;
    }
  }

  .required label::after {
    content: '*';
    color: red;
  }

  .notes-title {
    margin-top: 3rem;
  }

  .messages {
    margin: -2rem 0 3rem 0;
  }

  .btn {
    width: 45%;
    height: 4rem;
    background-color: #555;
    color: #fafafa;
    border: none;
    border-radius: 2px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    cursor: pointer;
  }
`;

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

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
  const [ordered, setOrdered] = useState(false);

  const { cart, clearCart } = useContext(AppContext);
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

  const handleOrder = async (setLoading) => {
    const errors = validate();
    if (Object.keys(errors).length) {
      setErrors(errors);
      setLoading(false);
      return;
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
    await axios.post('/api/orders', orderData);
    setLoading(false);
    setOrdered(true);
    clearCart();
    scrollToTop();
  };

  const handleFocus = (inputName) => {
    const updatedErrors = { ...errors };
    updatedErrors[inputName] = false;
    setErrors(updatedErrors);
  };

  if (!localStorage.getItem('cart_items')) {
    return <Redirect to='/shop' />;
  }

  return (
    <CheckoutWrapper>
      <Title title='Checkout' />

      <div className='container'>
        {ordered ? (
          <>
            <div className='messages'>
              <Message
                visible
                text='Поруџбина успешно прослеђена. Контактираћемо вас путем смс-а ради потврде. Хвала на поверењу!'
                msgStyle='success'
              />
              <Message visible text='Ваша корпа је испражњена' />
            </div>
            <Link to='/'>
              <button className='btn'>Назад на почетну ⏎</button>
            </Link>
          </>
        ) : (
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
        )}
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
