import { useState } from 'react';
import { useApp } from '../context/AppContext';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: 'duvida',
  message: '',
};

export default function ContactPage() {
  const { saveMessage } = useApp();
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    saveMessage(form);
    setForm(initialForm);
    setSent(true);
  };

  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">Contato</span>
        <h1>Canal de contato agora funcional sem backend.</h1>
        <p>
          As mensagens desta versao ficam salvas localmente, o que permite testar a interface sem depender de
          banco ou PHP.
        </p>
      </section>

      <section className="contact-grid">
        <article className="info-card">
          <h3>Unidade</h3>
          <p>Av. Laranja, 123</p>
          <p>Ourinhos - SP</p>
          <p>Seg a sex, 6h as 22h</p>
        </article>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nome</span>
            <input value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required />
          </label>
          <label className="field">
            <span>Telefone</span>
            <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required />
          </label>
          <label className="field">
            <span>Assunto</span>
            <select value={form.subject} onChange={(e) => updateField('subject', e.target.value)}>
              <option value="duvida">Duvida</option>
              <option value="matricula">Matricula</option>
              <option value="sugestao">Sugestao</option>
              <option value="outro">Outro</option>
            </select>
          </label>
          <label className="field">
            <span>Mensagem</span>
            <textarea value={form.message} onChange={(e) => updateField('message', e.target.value)} required />
          </label>
          <button type="submit" className="primary-button">Enviar mensagem</button>
          {sent && <p className="success-text">Mensagem salva localmente com sucesso.</p>}
        </form>
      </section>
    </div>
  );
}
