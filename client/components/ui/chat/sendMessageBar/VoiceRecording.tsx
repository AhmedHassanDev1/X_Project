"use client"

import { useContext, useEffect, useRef } from "react"
import { MessageContext } from "./SendMessageBar"
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

function VoiceRecording() {
  const { setMedia, setRecording } = useContext(MessageContext)
  const streamRef = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const handleClose = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;

    }


  }
  const handleStopRecording = async () => {
    setRecording(false)
    handleClose()
  }
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let source: MediaStreamAudioSourceNode | null = null;

    let isMounted = true
    const handleVoiceRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (isMounted) {
          streamRef.current = stream
        }
        const recorder = new MediaRecorder(stream);

        recorderRef.current = recorder;
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          audioRef.current.play().catch(() => { });
        }
        const chunks: Blob[] = [];
        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        // Waveform visualization
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 2048;
        const bufferLength = analyser.fftSize;
        dataArray = new Uint8Array(bufferLength);
        function draw() {
          if (!canvasRef.current || !analyser || !dataArray) return;

          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          analyser.getByteTimeDomainData(dataArray);

          ctx.fillStyle = "#27272a";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.lineWidth = 6;
          ctx.strokeStyle = "white";
          ctx.beginPath();

          const sliceWidth = canvas.width / dataArray.length;
          let x = 0;

          for (let i = 0; i < dataArray.length; i++) {
            const v = dataArray[i] / 128.0; // normalize
            const y = (v * canvas.height) / 2;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            x += sliceWidth;
          }

          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();

          animationRef.current = requestAnimationFrame(draw);
        }

        draw();
        recorder.start();
      } catch (error) {
        console.error("Error accessing microphone:", error)
      }

    }

    handleVoiceRecording()
    return () => {
      return () => {
        isMounted = false;
        // Stop animation
        if (animationRef.current) cancelAnimationFrame(animationRef.current);

        // Stop tracks
        handleStopRecording();

        // Close audio context
        if (audioCtx) audioCtx.close();
      };
    }
  }, [])

  return (
    <div className="flex h-12 overflow-hidden items-center bg-zinc-800 rounded-full p-2">
      <div className="flex-1 text-white mx-2">
        <canvas ref={canvasRef} className="w-full h-full overflow-hidden" />
        <audio ref={audioRef} controls className="hidden" />
      </div>
      <button className="bg-zinc-600 p-2 rounded-full">
        <IoMdClose size={20} onClick={handleStopRecording} />
      </button>
      <button className="bg-zinc-600 mx-2 p-2 rounded-full">
        <FaCheck size={20} />
      </button>
    </div>
  )
}

export default VoiceRecording