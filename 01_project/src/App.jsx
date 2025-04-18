import { useState,useCallback,useEffect ,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [Password,setPassword]=useState("")

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)str+="0123456789"
    if(charAllowed)str+="!@#$%^&*_++{}[]~`"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str[char-1]
    }
setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

const copyPasswordTOClipboard=useCallback(()=>{
  passwordRef.current?.select()//for making blue after copy
  passwordRef.current?.setSelectionRange(0,99)// select text in range for copy
  window.navigator.clipboard.writeText(Password)
},[Password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])//itni values me kuuchh bhi touch kiya to phir se run call ho jayga function
  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-slate-800'>
          <h1 className='text-white text-center mx-2 my-3'>Password generator</h1>
          <div className=' flex shadow round-lg overflow-hidden mb-4 bg-white'>
            <input type="text" 
            value={Password}
            className='outline-none w-full py-1 px-3 rounded-lg'
            placeholder='password'
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick={
              copyPasswordTOClipboard
            }
            className='bg-blue-500 outline-none text-white px-3 py-0.5 shrink-0'>copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex item-center gap-x-1'>
              <input type="range"
              min={8}
              max={100} 
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}/>
              <label >length:{length}</label>
            </div>
            <div className='flex item-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
                <div className='flex item-center gap-x-1'>
                  <input type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={()=>{
                    setCharAllowed((prev)=>!prev)
                  }} />
                  <label htmlFor="characterInput">charaters</label>
                </div>
          </div>
        </div>

      </>
  )
}

export default App
