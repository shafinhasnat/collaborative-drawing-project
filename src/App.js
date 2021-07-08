import React, { useEffect, useRef, useState } from 'react';

function App() {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2,2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
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
    var base64ImageData = canvas.toDataURL("image/png");
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
