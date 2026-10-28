import { useEffect, useRef, useState } from 'react';

const visibilityKey = 'gymup:goalChatbotVisible';
const conversationsKey = 'gymup:assistantConversations';
const quickPrompts = ['Ganhar massa', 'Emagrecer', 'Estou começando', 'Melhorar condicionamento'];
const welcomeMessage = {
  id: 'welcome',
  author: 'assistente',
  text: 'Olá! Sou o assistente de IA do GymUp. Posso ajudar com suas metas e sua rotina de treino. O que você gostaria de alcançar?',
};

function createConversation() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: 'Nova conversa',
    updatedAt: Date.now(),
    messages: [{ ...welcomeMessage }],
  };
}

function readConversationState() {
  try {
    const saved = JSON.parse(localStorage.getItem(conversationsKey) || '[]');
    const chats = Array.isArray(saved) ? saved : saved.chats;
    if (Array.isArray(chats) && chats.length && chats.every((chat) => chat?.id && Array.isArray(chat.messages))) {
      const activeId = !Array.isArray(saved) && chats.some((chat) => chat.id === saved.activeId)
        ? saved.activeId
        : chats[0].id;
      return { chats, activeId };
    }
  } catch {
    // Start with a clean conversation if saved chat data is unavailable.
  }
  const initialChat = createConversation();
  return { chats: [initialChat], activeId: initialChat.id };
}

function getInitialVisibility() {
  try {
    return localStorage.getItem(visibilityKey) !== 'false';
  } catch {
    return true;
  }
}

export default function GoalChatbot() {
  const [isVisible, setIsVisible] = useState(getInitialVisibility);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const [conversationState, setConversationState] = useState(readConversationState);
  const { chats: conversations, activeId: activeConversationId } = conversationState;
  const setActiveConversationId = (activeId) => setConversationState((current) => ({ ...current, activeId }));
  const isSendingRef = useRef(false);
  const messageEndRef = useRef(null);
  const activeConversation = conversations.find((chat) => chat.id === activeConversationId) ?? conversations[0];
  const messages = activeConversation?.messages ?? [welcomeMessage];

  useEffect(() => {
    try {
      localStorage.setItem(visibilityKey, String(isVisible));
    } catch {
      // The assistant remains usable if browser storage is unavailable.
    }
  }, [isVisible]);

  useEffect(() => {
    try {
      localStorage.setItem(conversationsKey, JSON.stringify(conversationState));
    } catch {
      // Keep the current chat usable if browser storage is full or unavailable.
    }
  }, [conversationState]);

  useEffect(() => {
    let isCurrent = true;
    let retryTimer;
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/chat/status');
        const status = await response.json();
        if (!isCurrent) return;
        setAiStatus(status);
        if (!status.configured) retryTimer = window.setTimeout(checkStatus, 5000);
      } catch {
        if (!isCurrent) return;
        setAiStatus({ configured: false, ollamaRunning: false, modelAvailable: false, model: 'qwen3:4b-instruct' });
        retryTimer = window.setTimeout(checkStatus, 5000);
      }
    };
    checkStatus();
    return () => { isCurrent = false; window.clearTimeout(retryTimer); };
  }, []);

  useEffect(() => {
    if (isOpen) messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const hideChatbot = () => {
    setIsOpen(false);
    setIsVisible(false);
  };

  const startNewConversation = () => {
    if (isSendingRef.current) return;
    const next = createConversation();
    setConversationState((current) => ({ chats: [next, ...current.chats], activeId: next.id }));
    setMessage('');
  };

  const sendMessage = async (rawText) => {
    const text = rawText.trim();
    if (!text || isSendingRef.current) return;
    isSendingRef.current = true;
    const conversationId = activeConversationId;
    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setMessage('');
    setIsSending(true);

    const history = messages.slice(1).filter((item) => !item.isError).map((item) => ({
      role: item.author === 'usuario' ? 'user' : 'assistant',
      content: item.text,
    }));
    setConversationState((current) => ({
      ...current,
      chats: current.chats.map((chat) => chat.id === conversationId ? {
        ...chat,
        title: chat.title === 'Nova conversa' ? (text.length > 34 ? `${text.slice(0, 34).trim()}…` : text) : chat.title,
        updatedAt: Date.now(),
        messages: [...chat.messages, { id: timestamp, author: 'usuario', text }],
      } : chat),
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: text }] }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Não foi possível responder agora. Tente novamente.');
      setConversationState((current) => ({
        ...current,
        chats: current.chats.map((chat) => chat.id === conversationId ? {
          ...chat,
          updatedAt: Date.now(),
          messages: [...chat.messages, { id: `response-${timestamp}`, author: 'assistente', text: result.message }],
        } : chat),
      }));
    } catch (error) {
      setConversationState((current) => ({
        ...current,
        chats: current.chats.map((chat) => chat.id === conversationId ? {
          ...chat,
          updatedAt: Date.now(),
          messages: [...chat.messages, {
            id: `error-${timestamp}`,
            author: 'assistente',
            text: error.message || 'Não consegui conectar ao serviço de IA. Verifique sua conexão e tente novamente.',
            isError: true,
          }],
        } : chat),
      }));
    } finally {
      isSendingRef.current = false;
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
  };

  if (!isVisible) {
    return (
      <div className="goal-chatbot chatbot-hidden">
        <button type="button" className="chatbot-restore-button" onClick={() => { setIsVisible(true); setIsOpen(true); }} aria-label="Mostrar assistente de metas">
          <ChatIcon /><span>Falar sobre minhas metas</span>
        </button>
      </div>
    );
  }

  return (
    <section className="goal-chatbot" aria-label="Assistente de IA do GymUp">
      {isOpen && (
        <div id="goal-chatbot-window" className="chatbot-window" role="dialog" aria-modal="false" aria-labelledby="chatbot-title">
          <header className="chatbot-header">
            <div>
              <span className={`chatbot-status ${aiStatus?.configured ? '' : 'unconfigured'}`}><span aria-hidden="true" />{!aiStatus ? 'Verificando Ollama…' : !aiStatus.ollamaRunning ? 'Abra o Ollama' : !aiStatus.modelAvailable ? `Instale ${aiStatus.model}` : `IA local · ${aiStatus.model}`}</span>
              <h2 id="chatbot-title">Assistente de metas</h2>
              <p>Vamos transformar sua ideia em um próximo passo.</p>
            </div>
            <div className="chatbot-header-actions">
              <button type="button" className="chatbot-icon-button" onClick={hideChatbot} aria-label="Ocultar assistente" title="Ocultar assistente"><span aria-hidden="true">×</span></button>
              <button type="button" className="chatbot-icon-button" onClick={() => setIsOpen(false)} aria-label="Minimizar conversa" title="Minimizar conversa"><span aria-hidden="true">−</span></button>
            </div>
          </header>
          <div className="chatbot-conversation-toolbar">
            <span className="chatbot-history-label" aria-hidden="true">Histórico</span>
            <label className="sr-only" htmlFor="chatbot-conversation-select">Histórico de conversas</label>
            <select
              id="chatbot-conversation-select"
              value={activeConversation?.id ?? ''}
              onChange={(event) => setActiveConversationId(event.target.value)}
              disabled={isSending}
            >
              {conversations.map((chat) => <option key={chat.id} value={chat.id}>{chat.title}</option>)}
            </select>
            <button type="button" onClick={startNewConversation} disabled={isSending}>+ Novo chat</button>
          </div>
          <div className="chatbot-messages" role="log" aria-live="polite" aria-relevant="additions text" aria-label="Mensagens da conversa">
            {messages.map((item) => (
              <div key={item.id} className={`chatbot-message ${item.author}`}>
                <span>{item.author === 'assistente' ? 'GymUp' : 'Você'}</span><p>{item.text}</p>
              </div>
            ))}
            {isSending && <div className="chatbot-message assistente chatbot-typing" aria-label="A IA está respondendo">
              <span>GymUp</span><p><i /><i /><i /></p>
            </div>}
            <div ref={messageEndRef} />
          </div>
          {messages.length === 1 && <div className="chatbot-quick-prompts" aria-label="Sugestões de conversa">
            {quickPrompts.map((prompt) => <button key={prompt} type="button" disabled={isSending} onClick={() => sendMessage(prompt)}>{prompt}</button>)}
          </div>}
          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="goal-chatbot-message">Escreva sua meta</label>
            <input id="goal-chatbot-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escreva sua mensagem…" autoComplete="off" maxLength={2000} disabled={isSending} />
            <button type="submit" aria-label="Enviar mensagem" disabled={!message.trim() || isSending}><SendIcon /><span>{isSending ? 'Enviando' : 'Enviar'}</span></button>
          </form>
          <p className="chatbot-disclaimer">As mensagens são processadas localmente no seu computador. Orientações gerais; não substituem um profissional.</p>
        </div>
      )}
      <button type="button" className="chatbot-launcher" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="goal-chatbot-window" aria-label={isOpen ? 'Minimizar assistente' : 'Falar sobre minhas metas'}>
        <ChatIcon /><span>{isOpen ? 'Minimizar' : 'Falar sobre minhas metas'}</span>
      </button>
    </section>
  );
}

function ChatIcon() {
  return <svg className="chatbot-launcher-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.76L4 20l1.7-4.1A7.47 7.47 0 0 1 5 12a7.5 7.5 0 1 1 15 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>;
}

function SendIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m21 3-7.2 18-3.9-7.9L2 9.2 21 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 13 15 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
