import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// ✅ Added icons for better UI
// import { IoSendSharp } from 'react-icons/io5';
// import { FaRobot } from 'react-icons/fa';
// import { MdCloudUpload } from 'react-icons/md';

function Symptomchecker() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('loading...');
  const navigate = useNavigate();

  const imgupload = () => {
    navigate('/upload');
  };

  const enterprompt = async () => {
    try {
      const res = await axios.post('https://innovik-1-xzbo.vercel.app/Chatai', {
        prompt: prompt,
      });

      if (res.status == 200) {
        setAnswer(res.data.answer);
        const utterance = new SpeechSynthesisUtterance(res.data.answer);
        utterance.voice = window.speechSynthesis.getVoices()[0];
        utterance.lang = 'hi-IN';
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
      console.log(prompt);
      setPrompt('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // 🟢 UI IMPROVEMENT: Added a smooth gradient background and centered layout
    <div className="flex justify-center items-center bg-gradient-to-br from-green-100 via-white to-blue-100 min-h-screen w-screen">
      
      {/* 🟢 UI IMPROVEMENT: Added a modern white chat container with rounded corners and shadows */}
      <div className="w-[750px] h-[700px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* 🟢 UI IMPROVEMENT: Created a green header bar with AI icon and title */}
        <div className="bg-green-600 text-white text-center py-4 font-semibold text-2xl tracking-wide shadow-md flex items-center justify-center gap-3">
          {/* <FaRobot className="text-3xl" />  */}
          <span>AI Symptom Checker</span>
        </div>

        {/* 🟢 UI IMPROVEMENT: Chat message area styled with padding and scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {/* User message bubble */}
          <div className="flex justify-end">
            <div className="max-w-[75%] bg-green-200 text-gray-900 px-4 py-2 rounded-2xl rounded-br-none shadow">
              <p className="font-medium">
                {prompt ? prompt : "Ask me your health-related question..."}
              </p>
            </div>
          </div>

          {/* AI response bubble */}
          <div className="flex justify-start">
            <div className="max-w-[75%] bg-blue-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none shadow">
              <p>{answer}</p>
            </div>
          </div>
        </div>

        {/* 🟢 UI IMPROVEMENT: Redesigned bottom input area with buttons & icons */}
        <div className="bg-gray-100 border-t border-gray-300 flex items-center justify-between px-4 py-3 gap-2">
          
          {/* Upload button redesigned */}
          <button
            onClick={imgupload}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition rounded-full font-medium text-sm"
          >
            {/* <MdCloudUpload className="text-xl" /> */}
            Upload
          </button>

          {/* Text input styled */}
          <input
            type="text"
            placeholder="Type your symptoms or question..."
            className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />

          {/* Send button with send icon */}
          <button
            onClick={enterprompt}
            className="bg-green-600 hover:bg-green-700 transition text-white rounded-full px-5 py-2 flex items-center justify-center"
          >
            {/* <IoSendSharp className="text-xl" /> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Symptomchecker;