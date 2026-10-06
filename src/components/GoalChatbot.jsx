import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { getLocalRecommendation } from '../utils/localGoalAssistant';

const visibilityKey = 'gymup:goalChatbotVisible';
const quickPrompts = ['Quero ganhar massa muscular', 'Quero emagrecer', 'Estou começando agora', 'Quero melhorar meu condicionamento'];

function getInitialVisibility() {
  return localStorage.getItem(visibilityKey) !== 'false';
}

export default function GoalChatbot() {
  const { user } = useApp();
  const [isVisible, setIsVisible] = useState(getInitialVisibility);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      author: 'assistente',
      text: 'Olá! Sou o assistente local do GymUp. Posso sugerir metas de treino sem enviar seus dados para uma API. Conte o que você quer alcançar.',
    },
  ]);

  useEffect(() => {
    localStorage.setItem(visibilityKey, String(isVisible));
  }, [isVisible]);

  const hideChatbot = () => {
    setIsOpen(false);
    setIsVisible(false);
  };

  const sendMessage = (rawText) => {
    const text = rawText.trim();
    if (!text) return;
    const timestamp = Date.now();
    setMessages((current) => [
      ...current,
      { id: timestamp, author: 'usuario', text },
      { id: `recommendation-${timestamp}`, author: 'assistente', text: getLocalRecommendation(text, user) },
    ]);
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
  };

  if (!isVisible) {
    return (
      <button type="button" className="chatbot-restore-button" onClick={() => setIsVisible(true)} aria-label="Mostrar assistente de metas">
        <span aria-hidden="true">💬</span><span>Mostrar assistente</span>
      </button>
    );
  }

  return (
    <section className="goal-chatbot" aria-label="Assistente local de metas">
      {isOpen && (
        <div id="goal-chatbot-window" className="chatbot-window" role="dialog" aria-labelledby="chatbot-title">
          <header className="chatbot-header">
            <div>
              <span className="chatbot-status"><span aria-hidden="true" />Funciona localmente</span>
              <h2 id="chatbot-title">Assistente de metas</h2>
            </div>
            <div className="chatbot-header-actions">
              <button type="button" className="chatbot-icon-button" onClick={hideChatbot} aria-label="Ocultar assistente de metas" title="Ocultar assistente"><span aria-hidden="true">×</span></button>
              <button type="button" className="chatbot-icon-button" onClick={() => setIsOpen(false)} aria-label="Fechar conversa" title="Fechar conversa"><span aria-hidden="true">−</span></button>
            </div>
          </header>
          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item) => (
              <div key={item.id} className={`chatbot-message ${item.author}`}>
                <span>{item.author === 'assistente' ? 'GymUp local' : 'Você'}</span><p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbot-quick-prompts" aria-label="Sugestões de conversa">
            {quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendMessage(prompt)}>{prompt}</button>)}
          </div>
          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="goal-chatbot-message">Escreva sua meta</label>
            <input id="goal-chatbot-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Conte sua meta..." autoComplete="off" />
            <button type="submit" aria-label="Gerar recomendação">Enviar</button>
          </form>
        </div>
      )}
      <button type="button" className="chatbot-launcher" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="goal-chatbot-window">
        <span className="chatbot-launcher-icon" aria-hidden="true">💬</span><span>{isOpen ? 'Fechar assistente' : 'Falar sobre minhas metas'}</span>
      </button>
    </section>
  );
}
