import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  Maximize,
  Minimize,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";

const GameStream = ({ gameId, executablePath }) => {
  const { user } = useAuth();
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [streamQuality, setStreamQuality] = useState("Auto");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;

  const connectWebSocket = () => {
    if (!gameId) {
      setError("Game ID is required for streaming");
      setIsLoading(false);
      return;
    }

    try {
      const wsUrl = `ws://localhost:8080/stream/${gameId}`;
      console.log("Connecting to WebSocket:", wsUrl);

      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
        setIsConnected(true);
        setIsLoading(false);
        setReconnectAttempts(0);

        // Initialize the stream
        wsRef.current.send(
          JSON.stringify({
            type: "init",
            gameId,
            executablePath,
          })
        );
      };

      wsRef.current.onmessage = (event) => {
        try {
          if (event.data instanceof Blob) {
            // Handle binary video data
            event.data.arrayBuffer().then((buffer) => {
              if (
                sourceBufferRef.current &&
                !sourceBufferRef.current.updating
              ) {
                sourceBufferRef.current.appendBuffer(buffer);
              }
            });
          } else {
            // Handle JSON messages
            const data = JSON.parse(event.data);
            if (data.type === "error") {
              console.error("Server error:", data.message);
              setError(data.message);
            }
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("Connection error: " + error.message);
        setIsLoading(false);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
        setIsConnected(false);
        setError("Connection closed");

        // Attempt to reconnect
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log(
            `Attempting to reconnect (${
              reconnectAttempts + 1
            }/${maxReconnectAttempts})`
          );
          setTimeout(() => {
            setReconnectAttempts((prev) => prev + 1);
            connectWebSocket();
          }, 3000);
        }
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
      setError("Failed to establish connection");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    // Create MediaSource instance
    mediaSourceRef.current = new MediaSource();
    const video = videoRef.current;
    video.src = URL.createObjectURL(mediaSourceRef.current);

    mediaSourceRef.current.addEventListener("sourceopen", () => {
      try {
        sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer(
          'video/mp4; codecs="avc1.42E01E"'
        );
        console.log("MediaSource buffer created successfully");
        connectWebSocket();
      } catch (error) {
        console.error("MediaSource error:", error);
        setError("MediaSource error: " + error.message);
        setIsLoading(false);
      }
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (mediaSourceRef.current) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [gameId]);

  const handleInput = (inputData) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "input",
          ...inputData,
        })
      );
    }
  };

  const handleKeyDown = (e) => {
    handleInput({
      type: "keydown",
      key: e.key,
      code: e.code,
    });
  };

  const handleKeyUp = (e) => {
    handleInput({
      type: "keyup",
      key: e.key,
      code: e.code,
    });
  };

  const handleMouseMove = (e) => {
    const rect = videoRef.current.getBoundingClientRect();
    handleInput({
      type: "mousemove",
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseDown = (e) => {
    handleInput({
      type: "mousedown",
      button: e.button,
    });
  };

  const handleMouseUp = (e) => {
    handleInput({
      type: "mouseup",
      button: e.button,
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
          {reconnectAttempts < maxReconnectAttempts && (
            <button
              onClick={() => {
                setError(null);
                setReconnectAttempts(0);
                connectWebSocket();
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reconnect
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        tabIndex={0}
      />

      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-black/50 rounded-full hover:bg-black/70"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 bg-black/50 rounded-full hover:bg-black/70"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-black/50 rounded-full hover:bg-black/70"
        >
          <Settings size={20} />
        </button>
      </div>

      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/80 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Quality
              </label>
              <select
                value={streamQuality}
                onChange={(e) => setStreamQuality(e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-2"
              >
                <option value="Auto">Auto</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Volume
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStream;
