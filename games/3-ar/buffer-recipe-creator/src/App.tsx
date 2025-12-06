import Level1 from './components/Level1';
import './styles.css';

/**
 * Buffer Builder - Conceptual Chemistry Game
 *
 * Level 1: Visual molecule manipulation (NO calculations)
 * Level 2: Buffer defense scenarios (coming soon)
 * Level 3: Henderson-Hasselbalch calculations (see App-OLD-Calculation.tsx)
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Level1 />

      <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-200 mt-8">
        <p>Kvennaskólinn í Reykjavík - Stuðpúðasmíði</p>
        <p className="text-xs mt-1">Stig 1: Hugmyndafræðilegur grunnur</p>
      </footer>
    </div>
  );
}

export default App;
