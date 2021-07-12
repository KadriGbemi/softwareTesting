import './App.css';
import Button from './components/button'
import Todo from './components/todo/todoUI';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <Button label="Don't click me"/>
      <Todo/>
    </header>
  </div>
  );
}

export default App;
