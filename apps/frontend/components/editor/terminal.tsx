'use client';
import React from 'react'
import {Terminal} from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import "@xterm/xterm/css/xterm.css";

const term: Terminal = new Terminal();

const XTerminal = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      term.open(terminalRef.current);
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    }
  }, [terminalRef]);
  
  return (
    <div ref={terminalRef}></div>
  )
}

export default XTerminal