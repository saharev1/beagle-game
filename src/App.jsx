import React, { useState, useEffect } from 'react';
import './RegistrationScreen.css'; // Подключаем нашу новую красоту
import './Game.css'; // Стили для экранов игры

const avatars = [
  { id: 1, src: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=200&h=200&q=80', label: 'Орлёнок 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=200&h=200&q=80', label: 'Орлёнок 2' },
  { id: 3, src: 'https://i.pinimg.com/originals/9c/f6/d7/9cf6d7a74d35fb7970ea64e3f5341967.png', label: 'Орлёнок 3' },
  { id: 4, src: 'https://tse4.mm.bing.net/th/id/OIP.tJGVoFKoLewCu26nUxrxPwHaE7?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3', label: 'Орлёнок 4' },
  { id: 5, src: 'https://tse1.mm.bing.net/th/id/OIP.2ko72n4bPOYKbxqTYdWeFwHaE7?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3', label: 'Орлёнок 5' },
  { id: 6, src: 'https://tse2.mm.bing.net/th/id/OIP.IAsjbWiMLxXzwDZdjJrEgwHaE5?cb=thfc1&w=923&h=611&rs=1&pid=ImgDetMain&o=7&rm=3', label: 'Орлёнок 6' },
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
        <img src="https://placehold.co/150x150/transparent/6B21A8?text=..." alt="Загрузка..." className="loading-eagle" />
        <h2 className="loading-text">Отправляемся в полет...</h2>
      </div>
    );
  }

  return (
    <div className="registration-wrapper">
      <div className="registration-container">
        <img src="https://placehold.co/400x120/transparent/6B21A8?text=ОРЛЯТА+РОССИИ" alt="Орлята России" className="logo" />
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

const TRACKS = [
  { id: 1, title: 'Лидер', description: 'Вести за собой — это искусство.' },
  { id: 2, title: 'Эрудит', description: 'Знания — твоя главная сила.' },
  { id: 3, title: 'Эколог', description: 'Береги природу, она наш дом.' },
  { id: 4, title: 'Мастер', description: 'Твори и создавай своими руками.' },
  { id: 5, title: 'Спортсмен', description: 'В здоровом теле — здоровый дух.' },
  { id: 6, title: 'Хранитель истории', description: 'Помни прошлое, строй будущее.' },
  { id: 7, title: 'Доброволец', description: 'Помогай другим от чистого сердца.' },
];

const Tutorial = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000); // Исчезает через 5 секунд
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="tutorial-overlay" onClick={onComplete}>
      <div className="tutorial-content">
        <h2>Обучение</h2>
        <p>Это твоё игровое поле. Здесь 7 треков.</p>
        <p>Сейчас активен только первый трек. Остальные скрыты туманом.</p>
        <p>Пройди трек до конца — и откроется следующий!</p>
        <p className="tutorial-hint">(Нажми, чтобы продолжить)</p>
        <button onClick={onComplete} className="submit-button">Понятно!</button>
      </div>
    </div>
  );
};

const VideoScreen = ({ onComplete }) => {
  return (
    <div className="video-screen">
      <h2 className="title">Видео от наставника</h2>
      <div className="video-placeholder">
        <p>▶ Воспроизведение видео (до 3 мин)</p>
      </div>
      <button onClick={onComplete} className="submit-button">Перейти к Заданию 1</button>
    </div>
  );
};

const TaskScreen = ({ track, onFinish }) => {
  const [currentTask, setCurrentTask] = useState(1);
  const [attempts, setAttempts] = useState(1);
  const [scoreEarned, setScoreEarned] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScoreEarned(prev => prev + 10); // Правильно = 10 баллов
      moveToNextTask();
    } else {
      if (attempts === 1) {
        setAttempts(2); // Вторая попытка
      } else {
        moveToNextTask(); // Если 2 раза мимо — идем дальше без баллов
      }
    }
  };

  const moveToNextTask = () => {
    if (currentTask < 5) {
      setCurrentTask(prev => prev + 1);
      setAttempts(1);
    } else {
      onFinish(scoreEarned);
    }
  };

  return (
    <div className="task-screen">
      <h2 className="title">Трек: {track.title}</h2>
      <h3 className="subtitle">
        {currentTask < 5 ? `Задание ${currentTask} из 4` : 'Итоговое задание 5'}
      </h3>
      <div className="task-card">
        <p>Внимание! Вопрос по треку. Здесь будет картинка или текст.</p>
        <p className="attempts-indicator">Попытка: {attempts} из 2</p>
        
        <div className="task-actions">
          <button onClick={() => handleAnswer(true)} className="submit-button task-btn correct">Правильный ответ</button>
          <button onClick={() => handleAnswer(false)} className="submit-button task-btn wrong">Неправильный ответ</button>
        </div>
      </div>
    </div>
  );
};

const GameBoard = ({ user, activeTrackId, onTrackSelect, score }) => {
  const avatar = avatars.find(a => a.id === user.avatarId);
  return (
    <div className="game-board-wrapper">
      <header className="game-header">
        <div className="user-profile">
          <img src={avatar?.src} alt={avatar?.label} className="header-avatar" />
          <div className="user-info">
            <span className="user-name">{user.firstName} {user.lastName}</span>
            <span className="user-score">Баллы: <strong>{score}</strong></span>
          </div>
        </div>
      </header>
      
      <div className="tracks-grid">
        {TRACKS.map(track => {
          const isLocked = track.id > activeTrackId;
          const isCompleted = track.id < activeTrackId;
          const isActive = track.id === activeTrackId;

          return (
            <div 
              key={track.id} 
              className={`track-card ${isLocked ? 'locked' : ''} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => isActive && onTrackSelect(track)}
            >
              {isLocked && <div className="fog"><span className="lock-icon">🔒</span></div>}
              <h3>{track.title}</h3>
              {isActive && <p className="track-desc">{track.description}</p>}
              {isCompleted && <span className="status-badge">✅ Пройден</span>}
              {isActive && <span className="status-badge active-badge">▶ Начать</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App = () => {
  const [screen, setScreen] = useState('registration'); // Возможные: registration, tutorial, board, video, task, final
  const [userData, setUserData] = useState(null);
  const [score, setScore] = useState(0);
  const [activeTrackId, setActiveTrackId] = useState(1);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleRegister = (data) => {
    setUserData(data);
    setScreen('tutorial');
  };

  // Маршрутизатор экранов (Стейт-машина)
  if (screen === 'registration') return <RegistrationScreen onRegister={handleRegister} />;
  if (screen === 'tutorial') return <Tutorial onComplete={() => setScreen('board')} />;
  if (screen === 'board') return <GameBoard user={userData} activeTrackId={activeTrackId} onTrackSelect={(t) => { setCurrentTrack(t); setScreen('video'); }} score={score} />;
  if (screen === 'video') return <VideoScreen onComplete={() => setScreen('task')} />;
  if (screen === 'task') return <TaskScreen track={currentTrack} onFinish={(earned) => {
    setScore(prev => prev + earned);
    if (activeTrackId < 7) { setActiveTrackId(prev => prev + 1); setScreen('board'); }
    else { setScreen('final'); }
  }} />;
  
  if (screen === 'final') return (
    <div className="final-screen">
      <h1 className="title">🎉 Игра завершена!</h1>
      <p className="subtitle">Твой итоговый счёт: {score} из 350</p>
      {score >= 250 ? <div className="ticket"><h2>🎟️ Пригласительный билет</h2><p>Действителен при предъявлении</p></div> : <p className="failed-text">Тебе не хватило немного баллов. Попробуй ещё раз!</p>}
    </div>
  );

  return null;
};

export default App;