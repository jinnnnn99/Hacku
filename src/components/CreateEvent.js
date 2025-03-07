// src/components/CreateEvent.js
import React, { useState } from 'react';

function CreateEvent({ onEventCreated }) {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('http://localhost:5003/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, cost: parseInt(cost) })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Event created:', data);
      setMessage(`${data.event_name}が正常に作成されました！`);
      onEventCreated({ 
        id: data.id, 
        name: data.event_name, 
        cost: parseInt(cost) 
      });
      setName('');
      setCost(0);
      setTimeout(() => setMessage(''), 3000);
    })
    .catch(error => console.error('Error creating event:', error));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>アクティビティ作成</h1>
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label style={{ flex: '1', marginRight: '10px' }}>
            アクティビティ
            <input 
              type="text" 
              placeholder="アクティビティ名" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </label>
          
          <label style={{ flex: '1', marginLeft: '10px' }}>
            ポイント
            <input 
              type="number" 
              placeholder="コスト (ポイント)" 
              value={cost} 
              onChange={(e) => setCost(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </label>
        </div>
        
        <button type="submit" style={{
          padding: '10px 15px',
          backgroundColor: '#2965a8',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          作成する
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
