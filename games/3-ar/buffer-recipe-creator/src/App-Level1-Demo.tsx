import Level1 from './components/Level1';
import './index.css';

/**
 * Demo App showing Buffer Builder Level 1 (Conceptual)
 *
 * This replaces calculation-heavy game with visual molecule manipulation
 * Students learn concepts, not formulas
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Level1 />

      <footer className="text-center text-sm text-gray-500 py-4">
        <p>🧪 Kvennaskólinn í Reykjavík - Buffer Builder Level 1 (Conceptual Prototype)</p>
      </footer>
    </div>
  );
}

export default App;
