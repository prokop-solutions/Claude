import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import ICD10LearningSystemWithAuth from './components/ICD10LearningSystemWithAuth'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ICD10LearningSystemWithAuth />
      </div>
    </AuthProvider>
  )
}

export default App
