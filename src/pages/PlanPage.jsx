import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { plans } from '../data/plans';
import { useApp } from '../context/AppContext';

export default function PlanPage() {
  const { slug } = useParams();
  const { notes, saveExerciseNote, prs, addPr, choosePlan, workoutOrders, reorderPlanWorkouts } = useApp();
  const plan = plans.find((item) => item.slug === slug);
  const [selectedDay, setSelectedDay] = useState('Todos');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [prValue, setPrValue] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [draggingExercise, setDraggingExercise] = useState(null);
  const workouts = workoutOrders[slug] ?? plan?.workouts ?? [];

  const workoutDays = useMemo(
    () => ['Todos', ...new Set(workouts.map((workout) => workout.day))],
    [workouts]
  );

  if (!plan) {
    return <Navigate to="/metas" replace />;
  }

  const filteredWorkouts =
    selectedDay === 'Todos'
      ? workouts
      : workouts.filter((workout) => workout.day === selectedDay);

  const getExercisePr = (exerciseName) => {
    const exercisePrs = prs.filter((item) => item.exercise === exerciseName);

    if (!exercisePrs.length) {
      return null;
    }

    return exercisePrs.reduce((best, item) => (Number(item.weight) > Number(best.weight) ? item : best));
  };

  const openExercise = (workout) => {
    setSelectedExercise(workout);
    setDraftNote(notes[workout.exercise] ?? '');
    setPrValue('');
  };

  const handleWorkoutKeyDown = (event, workout) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openExercise(workout);
    }
  };

  const closeExercise = () => {
    setSelectedExercise(null);
    setDraftNote('');
    setPrValue('');
  };

  const handleSaveExercise = () => {
    if (!selectedExercise) return;

    saveExerciseNote(selectedExercise.exercise, draftNote);

    if (prValue) {
      addPr({
        exercise: selectedExercise.exercise,
        weight: Number(prValue),
        date: new Date().toISOString().slice(0, 10),
      });
    }

    closeExercise();
  };

  const moveWorkout = (sourceExercise, targetExercise) => {
    if (!sourceExercise || !targetExercise || sourceExercise.exercise === targetExercise.exercise) {
      return;
    }

    const next = [...workouts];
    const sourceIndex = next.findIndex((item) => item.exercise === sourceExercise.exercise);
    const targetIndex = next.findIndex((item) => item.exercise === targetExercise.exercise);

    if (sourceIndex === -1 || targetIndex === -1) {
      return;
    }

    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    reorderPlanWorkouts(slug, next);
  };

  const removeWorkout = (workoutToRemove) => {
    const shouldRemove = window.confirm(`Remover ${workoutToRemove.exercise} deste plano?`);

    if (!shouldRemove) {
      return;
    }

    const next = workouts.filter(
      (workout) => !(workout.day === workoutToRemove.day && workout.exercise === workoutToRemove.exercise)
    );

    reorderPlanWorkouts(slug, next);

    if (selectedExercise?.exercise === workoutToRemove.exercise) {
      closeExercise();
    }
  };

  const renderDifficulty = (value = 0) => {
    return Array.from({ length: 5 }, (_, index) => {
      const active = value >= index + 1 || value > index && value < index + 1;
      return (
        <span key={`${value}-${index}`} className={active ? 'star active' : 'star'}>
          ★
        </span>
      );
    });
  };

  return (
    <div className="page">
      <section className="plan-hero">
        <img src={plan.heroImage} alt={plan.label} />
        <div className="plan-hero-copy">
          <span className="eyebrow">{plan.label}</span>
          <h1>{plan.title}</h1>
          <p>{plan.description}</p>
          <div className="badge-row">
            {plan.badges.map((badge) => (
              <span key={badge} className="soft-badge">
                {badge}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => choosePlan(plan.slug)}>
              Tornar meu plano
            </button>
            <span className="plan-frequency">{plan.frequency}</span>
          </div>
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h3>Objetivo</h3>
          <p>{plan.objective}</p>
        </article>
        <article className="info-card">
          <h3>Aquecimento</h3>
          <ul>
            {plan.warmup.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="info-card">
          <h3>Pos treino</h3>
          <ul>
            {plan.recovery.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="workout-panel">
        <div className="workout-panel-header">
          <div>
            <span className="eyebrow">Plano de treino</span>
            <h2>Exercicios e detalhes praticos</h2>
          </div>
          <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
            {workoutDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="workout-table">
          <div className="workout-row workout-head">
            <span>Dia</span>
            <span>Exercicio</span>
            <span>Series</span>
            <span>Descanso</span>
            <span>Acao</span>
          </div>
          {filteredWorkouts.map((workout) => {
            const exerciseNote = notes[workout.exercise]?.trim();
            const exercisePr = getExercisePr(workout.exercise);

            return (
              <div
                key={`${workout.day}-${workout.exercise}`}
                className={draggingExercise?.exercise === workout.exercise ? 'workout-row dragging' : 'workout-row'}
                role="button"
                tabIndex={0}
                draggable
                onClick={() => openExercise(workout)}
                onKeyDown={(event) => handleWorkoutKeyDown(event, workout)}
                onDragStart={() => setDraggingExercise(workout)}
                onDragEnd={() => setDraggingExercise(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  moveWorkout(draggingExercise, workout);
                  setDraggingExercise(null);
                }}
              >
                <span>{workout.day}</span>
                <span>{workout.exercise}</span>
                <span>{workout.sets}</span>
                <span>{workout.rest}</span>
                <div className="workout-actions">
                  <button
                    type="button"
                    className="remove-exercise-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeWorkout(workout);
                    }}
                  >
                    Remover
                  </button>
                  <span className="drag-hint">Arraste</span>
                </div>
                <div className="workout-extra">
                  <span>
                    <strong>Anotacao:</strong> {exerciseNote || 'Sem anotacao salva.'}
                  </span>
                  <span>
                    <strong>PR:</strong>{' '}
                    {exercisePr ? `${exercisePr.weight} kg em ${exercisePr.date}` : 'Nenhum PR registrado.'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="faq-grid">
        {plan.faq.map((item) => (
          <details key={item.question} className="faq-card">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      {selectedExercise && (
        <div className="modal-backdrop" onClick={closeExercise}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-card-header">
              <div>
                <span className="eyebrow">{selectedExercise.day}</span>
                <h3>{selectedExercise.exercise}</h3>
              </div>
              <button type="button" className="ghost-button" onClick={closeExercise}>
                Fechar
              </button>
            </div>
            <video className="exercise-video" src={selectedExercise.video} controls autoPlay/>
            <p>{selectedExercise.notes}</p>
            <div className="exercise-meta">
              <div>
                <span className="meta-label">Equipamento</span>
                <strong>{selectedExercise.equipment}</strong>
              </div>
              <div>
                <span className="meta-label">Musculo principal</span>
                <strong>{selectedExercise.primaryMuscle}</strong>
              </div>
              <div>
                <span className="meta-label">Musculo secundario</span>
                <strong>{selectedExercise.secondaryMuscle}</strong>
              </div>
              <div>
                <span className="meta-label">Dificuldade</span>
                <div className="star-row">{renderDifficulty(selectedExercise.difficulty)}</div>
              </div>
            </div>
            <div className="exercise-steps">
              <h4>Execucao</h4>
              <ul>
                {(selectedExercise.description ?? []).map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <label className="field">
              <span>Minha anotacao</span>
              <textarea
                value={draftNote}
                onChange={(event) => setDraftNote(event.target.value)}
                placeholder="Escreva como foi a execucao, carga usada ou algum ajuste."
              />
            </label>
            <label className="field">
              <span>Registrar PR em kg</span>
              <input
                type="number"
                min="0"
                value={prValue}
                onChange={(event) => setPrValue(event.target.value)}
                placeholder="Ex: 80"
              />
            </label>
            <div className="modal-footer">
              <button type="button" className="primary-button" onClick={handleSaveExercise}>
                Salvar nota
              </button>
              <span className="muted-text">
                Ultimos PRs: {prs.slice(0, 3).map((item) => `${item.exercise} ${item.weight}kg`).join(' | ')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
