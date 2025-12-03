import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { FaPlay, FaTrashAlt } from 'react-icons/fa';

export default function LiveJsEditor({ code: initialCode = '' }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  const captureConsole = () => {
    const originalConsoleLog = console.log;

    console.log = function (...args) {
      setOutput((prev) => prev + args.join(' ') + '\n');
      originalConsoleLog.apply(console, args);
    };

    try {
      eval(code); // Run the edited code
    } catch (err) {
      setOutput((prev) => prev + 'ERROR: ' + err.message + '\n');
    }

    console.log = originalConsoleLog;
  };

  const clearConsole = () => setOutput('');

  return (
    <div style={styles.container}>
      <div style={styles.editorWrapper}>
        <CodeMirror
          value={code}
          extensions={[javascript()]}
          theme="dark"
          onChange={(value) => setCode(value)}
          style={styles.editor}
        />
        <button style={styles.runButton} onClick={captureConsole}>
          <FaPlay size={10}/>
        </button>
      </div>

      <div style={styles.consoleWrapper}>
        <pre style={styles.console}>
          {output || '📝 Console output will appear here...'}
        </pre>
        <button style={styles.clearButton} onClick={clearConsole}>
          <FaTrashAlt size={10}/>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1e1e1e', // Dark theme container
    color: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
  },
  editorWrapper: {
    position: 'relative',
    border: '1px solid #333',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  editor: {
    fontFamily: 'monospace',
    fontSize: '14px',
    backgroundColor: '#2d2d2d', // Dark background for editor
    color: '#ffffff', // Light text
    padding: '10px',
  },
  runButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '7px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consoleWrapper: {
    position: 'relative',
    marginTop: '10px',
    backgroundColor: '#252526', // Dark background for console
    border: '1px solid #333',
    borderRadius: '5px',
    padding: '10px',
    overflowY: 'auto',
  },
  console: {
    fontFamily: 'monospace',
    fontSize: '14px',
		color: '#9c9595',
    whiteSpace: 'pre-wrap',
		backgroundColor: '#1e1e1e'
  },
  clearButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '7px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
