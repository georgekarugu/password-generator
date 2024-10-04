import { useCallback, useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const[length, setLength] =useState(8)
  const [numberAllowed, setnumberAllowed] = useState(true)
  const [charAllowed, setcharAllowed] = useState(true)
  const[password, setpassword] = useState('')

  const passwordRef=useRef(null)

  const generatePassword =useCallback (() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#"

    for(let i=1; i<length; i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  }, [length,numberAllowed, charAllowed])

  useEffect(()=>{
    generatePassword()
  }, [length,numberAllowed, charAllowed, generatePassword])

  const copyPasswordToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
     
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
          copy
        </button>
      </div>

      <div
      className='flex text-sm gap-x-2'
      >
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min='2'
          max='30'
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(parseInt(e.target.value))}
          />
          <label htmlFor='length'>Length:{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          className='cursor-pointer'
          onChange={() =>{
            setnumberAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor='number'>Numbers</label>
       
        </div>

        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={charAllowed}
          className='cursor-pointer'
          onChange={() =>{
            setcharAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor='charInput'>Character</label>
       
        </div>
      </div>
    </div>

   
  )
}

export default App
