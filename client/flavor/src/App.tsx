
import './App.css'
import Nav from './components/includes/Nav'
import Home from './components/views/Home'

function App() {
  

  return (
    <>
      <Nav />
      <div className='mx-auto max-w-screen-2xl'>
        <Home />

      </div>
    </>
  )
}

export default App
