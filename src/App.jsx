import { useJsonData } from './hooks/useJsonData.js';
import { DATA_PATHS } from './services/dataService.js';

export default function App() {
  const { data, loading, error } = useJsonData(DATA_PATHS.perfil);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <h1 className="p-4 text-primary">{data.nombre}</h1>;
}