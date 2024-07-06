import { useState } from 'react'
import Navbar from './componats/navbar'
import Footer from './componats/footer'
import Manager from './componats/manager'


function App() {

  return (
    <>
    
    <Navbar/>
     <div className="flex flex-col min-h-[92vh]">
      <main className="flex-grow bg-slate-200 overflow-hidden">
    <Manager/>
        {/* Content goes here */}
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
