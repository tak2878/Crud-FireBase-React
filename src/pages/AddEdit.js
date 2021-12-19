import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/AddEdit.css';
import fireDb from '../firebase';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child('user').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error('Please provide value in each input field');
    } else {
      if (!id) {
        fireDb.child('user').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('user Added Successfully');
          }
        });
      } else {
        fireDb.child(`user/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('User Updated Successfully');
          }
        });
      }
      setTimeout(() => navigate('/'), 500);
    }
  };
  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          className="inputStyle"
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="inputStyle"
          id="email"
          name="email"
          placeholder="Your email..."
          value={email || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          className="inputStyle"
          name="contact"
          placeholder="Your Contact No. .."
          value={contact || ''}
          onChange={handleInputChange}
        />

        <input
          type="submit"
          className="inputBtn"
          value={id ? 'update' : 'Save'}
        />
      </form>
    </div>
  );
};

export default AddEdit;
