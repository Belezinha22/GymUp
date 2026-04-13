import { createContext, useContext, useEffect, useState } from 'react';
import { plans } from '../data/plans';

const AppContext = createContext(null);

const storageKeys = {
  user: 'gymup:user',
  selectedPlan: 'gymup:selectedPlan',
  messages: 'gymup:messages',
  prs: 'gymup:prs',
  history: 'gymup:history',
  notes: 'gymup:notes',
  workoutOrders: 'gymup:workoutOrders',
};

const defaultUser = {
  name: 'Atleta GymUp',
  email: 'demo@gymup.com',
  password: '123456',
  age: 22,
  weight: 72,
  height: 1.75,
  goal: 'Hipertrofia',
};

function readStorage(key, fallback) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(storageKeys.user, null));
  const [selectedPlan, setSelectedPlan] = useState(() => readStorage(storageKeys.selectedPlan, 'iniciantes'));
  const [messages, setMessages] = useState(() => readStorage(storageKeys.messages, []));
  const [prs, setPrs] = useState(() => readStorage(storageKeys.prs, [
    { id: 1, exercise: 'Supino reto', weight: 80, date: '2026-04-02' },
    { id: 2, exercise: 'Agachamento goblet', weight: 28, date: '2026-04-06' },
  ]));
  const [history, setHistory] = useState(() => readStorage(storageKeys.history, [
    { id: 1, date: '2026-03-10', weight: 74, waist: 83, hip: 96 },
    { id: 2, date: '2026-04-10', weight: 72, waist: 80, hip: 95 },
  ]));
  const [notes, setNotes] = useState(() => readStorage(storageKeys.notes, {}));
  const [workoutOrders, setWorkoutOrders] = useState(() => readStorage(storageKeys.workoutOrders, {}));

  useEffect(() => localStorage.setItem(storageKeys.user, JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem(storageKeys.selectedPlan, JSON.stringify(selectedPlan)), [selectedPlan]);
  useEffect(() => localStorage.setItem(storageKeys.messages, JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem(storageKeys.prs, JSON.stringify(prs)), [prs]);
  useEffect(() => localStorage.setItem(storageKeys.history, JSON.stringify(history)), [history]);
  useEffect(() => localStorage.setItem(storageKeys.notes, JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem(storageKeys.workoutOrders, JSON.stringify(workoutOrders)), [workoutOrders]);

  const login = ({ email, password }) => {
    const candidate = user ?? defaultUser;
    if (candidate.email === email && candidate.password === password) {
      if (!user) setUser(candidate);
      return { ok: true };
    }
    return { ok: false, message: 'Email ou senha invalidos.' };
  };

  const register = (payload) => setUser({ ...payload });
  const logout = () => setUser(null);
  const updateProfile = (payload) => setUser((current) => ({ ...current, ...payload }));
  const choosePlan = (slug) => {
    setSelectedPlan(slug);
    const plan = plans.find((item) => item.slug === slug);
    if (plan && user) setUser((current) => ({ ...current, goal: plan.label }));
  };
  const saveMessage = (payload) => setMessages((current) => [{ id: Date.now(), ...payload }, ...current]);
  const addPr = (payload) => setPrs((current) => [{ id: Date.now(), ...payload }, ...current]);
  const addHistory = (payload) => setHistory((current) => [...current, { id: Date.now(), ...payload }]);
  const saveExerciseNote = (exerciseName, content) => setNotes((current) => ({ ...current, [exerciseName]: content }));
  const reorderPlanWorkouts = (planSlug, nextWorkouts) => {
    setWorkoutOrders((current) => ({ ...current, [planSlug]: nextWorkouts }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        selectedPlan,
        messages,
        prs,
        history,
        notes,
        workoutOrders,
        login,
        register,
        logout,
        updateProfile,
        choosePlan,
        saveMessage,
        addPr,
        addHistory,
        saveExerciseNote,
        reorderPlanWorkouts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
