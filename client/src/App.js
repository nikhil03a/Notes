import './App.css';
import FetchNotes from './components/FetchNotes';
import PostNote from './components/PostNote';
function App() {
  return (
    <div>
      <PostNote />
      <FetchNotes />
    </div>
  );
}

export default App;
