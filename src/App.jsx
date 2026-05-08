import React, { useState } from 'react';
import './RegistrationScreen.css'; // Подключаем нашу новую красоту

const avatars = [
  { id: 1, src: '/avatars/eagle-1.png', label: 'Орлёнок 1' },
  { id: 2, src: '/avatars/eagle-2.png', label: 'Орлёнок 2' },
  { id: 3, src: '/avatars/eagle-3.png', label: 'Орлёнок 3' },
  { id: 4, src: '/avatars/eagle-4.png', label: 'Орлёнок 4' },
  { id: 5, src: '/avatars/eagle-5.png', label: 'Орлёнок 5' },
  { id: 6, src: '/avatars/eagle-6.png', label: 'Орлёнок 6' },
];

const RegistrationScreen = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    schoolCity: '',
    avatarId: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.avatarId) {
      alert('Пожалуйста, выбери своего орлёнка!');
      return;
    }
    
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onRegister(formData);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <img src="/animations/flying-eagle.gif" alt="Загрузка..." className="loading-eagle" />
        <h2 className="loading-text">Отправляемся в полет...</h2>
      </div>
    );
  }

  return (
    <div className="registration-wrapper">
      <div className="registration-container">
        <img src="/logo-orlyata.png" alt="Орлята России" className="logo" />
        <h1 className="title">Добро пожаловать в игру!</h1>
        
        <form onSubmit={handleSubmit} className="form">
          <input 
            type="text" name="firstName" placeholder="Имя" required 
            onChange={handleInputChange} className="input-field" 
          />
          <input 
            type="text" name="lastName" placeholder="Фамилия" required 
            onChange={handleInputChange} className="input-field" 
          />
          <div className="input-row">
            <input 
              type="text" name="grade" placeholder="Класс (например, 4А)" required 
              onChange={handleInputChange} className="input-field half" 
            />
            <input 
              type="text" name="schoolCity" placeholder="Школа / Город" required 
              onChange={handleInputChange} className="input-field half" 
            />
          </div>

          <h3 className="subtitle">Выбери своего орлёнка:</h3>
          <div className="avatar-grid">
            {avatars.map((avatar) => (
              <div 
                key={avatar.id} 
                onClick={() => setFormData({ ...formData, avatarId: avatar.id })}
                className={`avatar-card ${formData.avatarId === avatar.id ? 'selected' : ''}`}
              >
                <img src={avatar.src} alt={avatar.label} className="avatar-image" />
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">Вперёд!</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationScreen;