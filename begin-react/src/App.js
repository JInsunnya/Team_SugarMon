import logo from './logo.svg';
import './App.css';
import Calendar from './calendar.jsx';
import TotalGi from './TotalGi.jsx';
import Pick from './foodpick.jsx';
import Check from './checklist.jsx';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  return (
    <div>
      <h1>Main App Component</h1>
      <Check></Check>
    </div>
  );
};

export default App;
