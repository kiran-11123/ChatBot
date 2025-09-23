import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';// Assuming this is imported
import { AiOutlineSend } from 'react-icons/ai';

function ChatLayout() {

  async function sendRequest(){
        
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
              <p>Hello! How can I help you today?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-100 rounded-lg px-3 py-2 max-w-xs">
              <p>Hi there!</p>
            </div>
          </div>
          {/* Add more messages here as needed */}
        </div>
      </div>

     
      <div className="w-[800px] mx-auto h-24  rounded-xl flex items-center justify-center">
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full max-w-xl h-10  px-4 py-2 rounded-lg outline-none"
        />
        
        <div className='bg-gray-300 px-3 py-2 rounded-lg h-10 flex'>
          <button onClick={sendRequest}><AiOutlineSend className='w-7 h-7  rounded-md text-center '/><span className='hidden'>hi</span></button>
         </div> 
        
        

      </div>
    </div>
  );
}

export default ChatLayout;
