import "./InputBox.css";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { cleanVoiceText } from "../../utils/cleanVoiceText";

export default function InputBox({ value, onChange, onSend, disabled }) {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition();

  const silenceTimer = useRef(null);
  const textareaRef = useRef(null);

  const [seconds, setSeconds] = useState(0);
  const [processingVoice, setProcessingVoice] = useState(false);

  // Update input while speaking
  useEffect(() => {
    const liveText = finalTranscript || interimTranscript || transcript;

    if (!liveText) return;

    onChange(cleanVoiceText(liveText));

    clearTimeout(silenceTimer.current);

    silenceTimer.current = setTimeout(() => {
      SpeechRecognition.stopListening();
      setProcessingVoice(true);

      setTimeout(() => {
        setProcessingVoice(false);
      }, 1200);
    }, 3000);
  }, [transcript, interimTranscript, finalTranscript, onChange]);

  // Recording timer
  useEffect(() => {
    let timer;

    if (listening) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => clearInterval(timer);
  }, [listening]);

  // Microphone permission check
  const checkMicrophonePermission = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const microphone = devices.find(
        (device) => device.kind === "audioinput"
      );

      if (!microphone) {
        toast.error("No microphone detected on this device.");
        return false;
      }

      if (navigator.permissions) {
        const permission = await navigator.permissions.query({
          name: "microphone"
        });

        if (permission.state === "denied") {
          toast.error(
            "Microphone permission denied. Enable it from browser settings."
          );
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Microphone permission error:", error);
      toast.error("Unable to access microphone.");
      return false;
    }
  };

  // Speech recognition errors
  useEffect(() => {
    const handleSpeechError = (event) => {
      console.error("Speech recognition error:", event);

      if (event.error === "not-allowed") {
        toast.error("Microphone permission was denied.");
      }
      if (event.error === "audio-capture") {
        toast.error("Unable to capture audio.");
      }
      if (event.error === "network") {
        toast.error("Speech recognition network error.");
      }
    };

    window.addEventListener("speechRecognitionError", handleSpeechError);

    return () => {
      window.removeEventListener("speechRecognitionError", handleSpeechError);
    };
  }, []);

  const canSend = () => {
    return value.trim().length > 0;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  const toggleListening = async () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error(
        "Voice input is currently unavailable. Please use Chrome or Edge."
      );
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setTimeout(() => {
        resetTranscript();
        textareaRef.current?.focus();
      }, 500);
      return;
    }

    const allowed = await checkMicrophonePermission();
    if (!allowed) return;

    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-UK"
    });
  };

  const formatTime = (value) => {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const renderWaveform = () => {
    return (
      <div className="voice-wave">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="input-box">
      {(listening || processingVoice) && (
        <div
          className={
            processingVoice ? "voice-status processing" : "voice-status"
          }
        >
          <div className="voice-header">
            <span>
              {processingVoice
                ? "⏳ Processing voice..."
                : "🎤 Listening..."}
            </span>
            <span className="voice-timer">{formatTime(seconds)}</span>
          </div>

          {listening && renderWaveform()}

          <div className="voice-preview">
            {interimTranscript || finalTranscript || "Start speaking..."}
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your symptoms..."
        disabled={disabled}
        rows="1"
      />

      <button
        className={listening ? "mic-btn listening" : "mic-btn"}
        onClick={toggleListening}
        disabled={disabled || processingVoice}
        title={listening ? "Stop recording" : "Start voice input"}
      >
        {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </button>

      <button onClick={onSend} disabled={disabled || !canSend()}>
        ➤
      </button>
    </div>
  );
}