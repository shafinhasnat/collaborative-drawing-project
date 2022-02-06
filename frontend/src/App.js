import React, { useEffect, useRef, useState } from 'react';

function App() {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

const HOST = "ws://localhost:5001";
const socket = new WebSocket(HOST);

  useEffect(() => {
    console.log("++++++>",HOST, process.env.REACT_APP_HOST_WS)
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 10;

    socket.addEventListener('open', event => {
      console.log('Connected to WS Server')
    });

    socket.addEventListener('message', data => {
      var image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
      image.src = data.data;
    });
    contextRef.current = context;

  }, []);

  const startDrawing = (e) => {
    const {offsetX, offsetY} = e.nativeEvent;
    // console.log({offsetX, offsetY})
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
  }
  const finishDrawing = () => {
    var canvas = document.querySelector('#board');
    contextRef.current.closePath();
    const timeout = setTimeout(() => {
      var base64ImageData = canvas.toDataURL("image/png");
      socket.send(base64ImageData)
    }, 500);
    if (!timeout) clearTimeout(timeout);
    
    setIsDrawing(false);
  }

  const draw = (e) => {
    if(!isDrawing) {
      return
    }
    const {offsetX, offsetY} = e.nativeEvent;
    // console.log(offsetX, offsetY)
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke()
  }

  return (
    <canvas
      className="board"
      id="board"
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}

export default App;
