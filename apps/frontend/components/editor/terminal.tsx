import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { io, Socket } from "socket.io-client";
import "xterm/css/xterm.css";

const XTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const replid = "kidd";
  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      fontFamily:
        'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: 14,
      scrollback: 1000, // Increase this value to allow more scrollback
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      fitAddon.fit();
    }

    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("create", {
        replid
      });
    });

    socket.on("output", (data) => {
      terminal.write(data);
      terminal.scrollToBottom();
    });

    terminal.onData((data) => {
      socket.emit("input", data);
      terminal.scrollToBottom();
    });

    const updateSize = () => {
      if (terminalRef.current) {
        const { offsetWidth, offsetHeight } = terminalRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    socketRef.current = socket;
    terminalInstanceRef.current = terminal;
    fitAddonRef.current = fitAddon;

    return () => {
      socket.disconnect();
      terminal.dispose();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const fitTerminal = () => {
      if (
        fitAddonRef.current &&
        socketRef.current &&
        terminalInstanceRef.current
      ) {
        fitAddonRef.current.fit();
        const { cols, rows } = terminalInstanceRef.current;
        socketRef.current.emit("resize", { cols, rows });
        terminalInstanceRef.current.scrollToBottom();
      }
    };

    fitTerminal();

    const timeoutId = setTimeout(fitTerminal, 0);

    return () => clearTimeout(timeoutId);
  }, [dimensions]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        position: "relative",
      }}
    />
  );
};

export default XTerminal;
