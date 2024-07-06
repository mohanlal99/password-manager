import { React, useState, useEffect, useRef } from "react";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const manager = () => {
  const [eye, setEye] = useState(false);
  const passref = useRef();
  const [form, setForm] = useState({ url: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswrod = async () => {
    const fet = await fetch('http://localhost:3000/')
    const data = await fet.json()
    console.log(data)
    setPasswordArray(data)
  }
  

  useEffect(() => {
    getPasswrod()
    // let password = localStorage.getItem("password");
    // if (password) {
    //   setPasswordArray(JSON.parse(password));
    // }
  }, []);

  const copyText = (text) => {
    toast.success('🦄Copied!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (eye) {
      setEye(false);
      passref.current.type = "password";
      console.log(passref.current);
    } else {
      setEye(true);
      passref.current.type = "text";
    }
  };

  const savePassword = async () => {
    if(form.url.trim() && form.password.trim() && form.username.trim() ){

      if(form.id){
        await fetch('http://localhost:3000/',{ method: 'DELETE',
        headers: {
            "Content-type": "application/json"},
            body: JSON.stringify({ id: form.id })
        })
      }


      setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    await fetch('http://localhost:3000/',{ method: 'POST',
    headers: {
        "Content-type": "application/json"},
        body: JSON.stringify({...form, id: uuidv4() })
    })
    toast.success('🦄Saved Successfuly!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      setForm({ url: "", username: "", password: "" })
    }
    else{
      
      {toast('Fill Information')}
    }

    // console.log([...passwordArray,form])
  };
  const deletePassword = async (id) => {
    if (confirm("Are you sure")){
      setPasswordArray(passwordArray.filter(item => item.id !== id ))
      // localStorage.setItem('password',JSON.stringify(passwordArray.filter(item => item.id !== id )))
      let res = await fetch('http://localhost:3000/',{ method: 'DELETE',
      headers: {
          "Content-type": "application/json"},
          body: JSON.stringify({ id })
      })
       toast.success('🦄Deleted Successfuly!', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         });
    }
  };
  const editPassword = (id) => {
  setForm({...passwordArray.filter(i => i.id === id )[0] , id:id })
  setPasswordArray(passwordArray.filter(item => item.id !== id ))
  };






  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      e.target.value.replace("*");
    }
  };
  return (
    
    <>
   
      <div className="container px-4 lg:px-52  py-2   mx-auto">
        <div className="font-bold text-2xl text-center">
          <span className="text-green-700">&lt;</span>Pass
          <span className="text-green-700">Op/&gt;</span>
          <p className="text-gray-700 text-lg pb-5 font-normal">
            Your Own Password Manager
          </p>
        </div>

        <div className="inp">
          <div className="first flex flex-col gap-5">
            <input
              className="w-full border-2 ps-4 border-green-700 p-2 rounded-full"
              placeholder="Enter Website URL"
              value={form.url}
              onChange={handlechange}
              type="text"
              name="url"
            />
            <div className="w-full flex flex-col lg:flex lg:flex-row gap-5 justify-start ">
              <input
                className="w-full lg:w-7/12  border-2 ps-4 border-green-700 p-1 rounded-full"
                placeholder="Enter Username"
                value={form.username}
                onChange={handlechange}
                type="text"
                name="username"
              />
              <div className="relative grid place-items-center">
                <input
                  className="w-full  border-2 ps-4 pr-8 border-green-700 p-1 rounded-full "
                  ref={passref}
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handlechange}
                  type="password"
                  name="password"
                />
                <span onClick={showPassword} className="absolute right-3">
                  {eye ? (
                    <i className="cursor-pointer fa-solid fa-eye"></i>
                  ) : (
                    <i className="cursor-pointer fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </div>
            </div>
            <div flex className="flex justify-center">
              <span className="bg-green-600 flex items-center font-bold rounded-full gap-2 px-2">
              <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  style={{'width':'25px',}}>
                </lord-icon>
              <button
                onClick={savePassword}
                className="" >
                Save
              </button>
              </span>
            </div>
          </div>
        </div>

        <div className="paswordshow overflow-x-auto">
          <h1 className="font-bold text-2xl ">Passwords</h1>
          {passwordArray.length === 0 && <div>Password is not found </div>}
          {passwordArray.length !== 0 && (
            <table className="w-full p-6 text-xs text-left ">
              <colgroup>
                <col className="w-5" />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-5" />
              </colgroup>
              <thead>
                <tr className="dark:bg-gray-300">
                  <th className="p-3">Id</th>
                  <th className="p-3">UserName</th>
                  <th className="p-3">URL</th>
                  <th className="p-3">Password</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
                {passwordArray.map((item,index)=>{
                  return <tr key={index} className="bg-green-100 border-2  capitalize">
                  <td className="px-3 py-2">{index+1}</td>  
                  <td className="px-3 py-2"><p className="flex  items-center gap-3"><span>{item.username}</span><span className="cursor-pointer" onClick={()=>{copyText(item.username)}}><lord-icon
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                  style={{'width':'25px',}}>
                  </lord-icon></span></p></td>
                  <td className="px-3 text-ellipsis py-2"><p className="flex normal-case  items-center gap-3"><span><a href={item.url} target="_blank">{item.url}</a></span><span className="cursor-pointer" onClick={()=>{copyText(item.url)}}><lord-icon
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                  style={{'width':'25px',}}>
                  </lord-icon></span></p></td>
                  <td className="px-3 py-2"><p className="flex  items-center gap-3"><span>{"*".repeat(item.password.length)}</span><span className="cursor-pointer" onClick={()=>{copyText(item.password)}}><lord-icon
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                  style={{'width':'25px',}}>
                  </lord-icon></span></p></td>
                  <td className="px-3 py-2 flex gap-4">
                    <span onClick={()=>{editPassword(item.id)}} className="cursor-pointer">

                    <lord-icon
                  src="https://cdn.lordicon.com/gwlusjdu.json"
                  trigger="hover"
                  style={{'width':'25px',}}
                  >
                  </lord-icon></span >
                    <span onClick={()=>{deletePassword(item.id)}} className="cursor-pointer">

                    <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="hover"
                  style={{'width':'25px',}}>
                  </lord-icon></span>
                      
                    
                  </td>
                </tr>
                })}
              </tbody>
            </table>
          )}
           <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
          {/* {passwordArray.length != 0 &&  <table  className="table-auto w-full  overflow-hidden rounded-t-xl">
              <thead className="bg-green-400 rounded-full ">
                <tr className="text-center">
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item,index)=>{
                  {console.log(item.url)}
                  return  <tr key={index} className="">
                  <td className="border-2 text-sm  text-ellipsis px-3 p-2 gap-3 "><a className="text-slate-800" href={item.url} target="_blank">{item.url}</a>
                  <span className="cursor-pointer" onClick={()=>{copyText(item.url)}}>
                  <lord-icon
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                ></lord-icon>
                  </span>
                  </td>
                  <td className="border-2 text-sm  text-ellipsis px-3 p-2 gap-3 ">{item.username}
                  <span className="cursor-pointer" onClick={()=>{copyText(item.username)}}>
                  <lord-icon
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                ></lord-icon>
                  </span></td>
                  <td className="border-2 text-sm  text-ellipsis px-3 p-2 gap-3 ">{item.password}
                  <span className="cursor-pointer" onClick={()=>{copyText(item.password)}}>
                  <lord-icon
                  src="https://cdn.lordicon.com/iykgtsbt.json"
                  trigger="hover"
                ></lord-icon>
                  </span></td>
                </tr>
                })}
                
              </tbody>
            </table>} */}
        </div>
      </div>
    </>
  );
};

export default manager;
