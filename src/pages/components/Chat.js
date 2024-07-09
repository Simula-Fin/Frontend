import React, { useState } from 'react';
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [history, setHistory] = useState([]);
    const [minimized, setMinimized] = useState(true);

    const apiKey = process.env.REACT_APP_API_KEY;

    const sendMessage = () => {
        if (!message.trim()) {
            setStatus('Please enter a message.');
            return;
        }
    
        setStatus('Loading...');
        setMessage('');
    
        fetch("https://peer-to-peer-loan-service-production.up.railway.app/bot", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: message,
                max_tokens: 2048,
                temperature: 0.5
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response && response.response && response.response.choices && response.response.choices.length > 0) {
                const r = response.response.choices[0].text;
                setStatus('');
                showHistory(message, r);
            } else {
                setStatus('Unexpected response format.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setStatus('Error, please try again later.');
        });
    };
    
    const showHistory = (message, response) => {
        setHistory(prevHistory => [
            ...prevHistory,
            { message: message, response: response }
        ]);
    };

    const toggleMinimize = () => {
        setMinimized(prevMinimized => !prevMinimized);
    };

    return (
        <div className={`fixed bottom-4 right-4 ${minimized ? 'w-16 h-16' : 'max-w-md w-full'}`}>
            <div className={`bg-emerald-600 text-white shadow-lg rounded-lg ${minimized ? 'p-2 flex justify-end' : 'p-6'}`}>
                {!minimized ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-center">Como posso ajudar ?</h2>
                            <button
                                className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={toggleMinimize}
                            >
                                <strong>__</strong>
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="border text-black p-2 w-full rounded"
                                placeholder="Escreva sua mensagem..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                className="bg-lime-950 text-white py-2 px-4 rounded hover:bg-blue-200"
                                onClick={sendMessage}
                            >
                                Enviar
                            </button>
                        </div>
                        {status && <p className="text-white mb-2">{status}</p>}
                        <div className="border p-4 h-64 overflow-y-auto rounded bg-white">
                            {history.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <div className="flex justify-end mb-1">
                                        <div className="bg-gray-400 rounded p-2 max-w-xs">{item.message}</div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-green-500 rounded p-2 max-w-xs">{item.response}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <button
                        className="bg-emerald-600 text-white py-2 px-3 rounded "
                        onClick={toggleMinimize}
                    >
                        <BiSolidMessageRoundedDetail size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Chat;