import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';// Assuming this is imported
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';

function Home() {

    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [question , setquestion]  = useState('');
    const [uploadQuestion , setUploadQuestion] = useState('');
    const [response,setResponse] = useState('');

async function sendRequest() {

  
  setUploadQuestion(question);
  const response = await  axios.post("http://localhost:3000/chat/ask" ,{question} , {
    withCredentials:true
  })

  if(response.status===200){

    setResponse(response.data.answer);

       
  }
  else{
      window.alert(response.data.message);
  }

  
  
}






  return (
    <div className="flex flex-col min-h-screen w-full px-2 py-2 bg-gray-200 text-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 mt-1 bg-slate-600 text-white rounded-md z-10 w-full max-w-[800px] mx-auto">
        <div className="font-mono">ChatBot</div>
        <div className="flex items-center">
          <FaRegUserCircle  className="mr-2 text-white w-10 h-10" />
        </div>
      </div>

      {/* Middle "Text Area" - Chat Messages Space (fills remaining height, scrollable) */}
      <div className="flex-1 w-full max-w-[800px] mx-auto mt-4 mb-4 bg-white rounded-xl overflow-y-auto p-4 shadow-lg">
        {/* Example chat messages - this acts like your "text area" for content */}
        <div className="flex flex-col space-y-4 overflow-auto">
          <div className="flex justify-start">
            <div className="bg-blue-100 rounded-lg px-3 py-2 max-w-xs">
              <p>{uploadQuestion}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-100 rounded-lg px-3 py-2 max-w-xs">
              <p>{response}</p>
            </div>
          </div>
          {/* Add more messages here as needed */}
        </div>
      </div>

     
       <div className="w-full max-w-[800px] mx-auto mt-4">
      <div className={`flex items-end gap-2 p-3 bg-gray-100 rounded-xl border border-gray-300 transition-all duration-200 ${
        isFocused ? 'ring-2 ring-blue-500' : '' 
     }`}>
        {/* Textarea for multiline input, like ChatGPT */}
        <textarea
          value={message}
          onChange={(e) => setquestion(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your message here..."
          className="flex-1 min-h-[40px] max-h-[150px] resize-none bg-transparent outline-none text-gray-900 placeholder-gray-500 leading-relaxed"
          rows={1}
         
        />
        
        {/* Send Button - Integrated on the right, subtle like ChatGPT */}
        <button
          onClick={sendRequest}
          disabled={!message.trim()}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
            message.trim()
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}

        >
          <span className='hidden'>hi</span>
          <AiOutlineSend className="w-5 h-5" />
        </button>
      </div>
    </div>

    </div>
  );
}

export default Home;
