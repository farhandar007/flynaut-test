// Class and Function Component Example with TypeScript Interface:
import React from 'react';

// Function component example with TypeScript interface for props
interface Props {
  name: string;
}

const FunctionComponent: React.FC<Props> = ({ name }) => {
  return <div>Hello, {name}! This is a function component.</div>;
};

class ClassComponent extends React.Component<Props> {
  render() {
    return <div>Hello, {this.props.name}! This is a class component.</div>;
  }
}

export { FunctionComponent, ClassComponent };

//Using Hooks to Get Updates in Function Components:
import React, { useState, useEffect } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;

//Example for Various React Hooks:
import React, { useState, useEffect, useCallback, useContext } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Runs after every render
    console.log('Effect: Count changed', count);
    return () => {
      // Cleanup function
      console.log('Cleanup');
    };
  }, [count]);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;

// Creating Socket.io Connectivity with Node:
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setReceivedMessage(data.message);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', { message });
    setMessage('');
  };

  return (
    <div>
      <p>Received message: {receivedMessage}</p>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;

// Creating a Div Reference and Scrolling Inside a Div:
import React, { useRef, useEffect } from 'react';

const ScrollableDiv: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, []);

  return (
    <div ref={divRef} style={{ overflowY: 'auto', maxHeight: '200px' }}>
      {/* Content inside the scrollable div */}
    </div>
  );
};

export default ScrollableDiv;

// Passing Data from One Component to Another Component:
// Parent Component:
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent: React.FC = () => {
  const [data, setData] = useState('');

  const handleDataChange = (newData: string) => {
    setData(newData);
  };

  return (
    <div>
      <ChildComponent onDataChange={handleDataChange} />
      <p>Data received from child: {data}</p>
    </div>
  );
};

export default ParentComponent;

//child component:
import React, { useState } from 'react';

interface Props {
  onDataChange: (data: string) => void;
}

const ChildComponent: React.FC<Props> = ({ onDataChange }) => {
  const [data, setData] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
    onDataChange(e.target.value);
  };

  return (
    <div>
      <input type="text" value={data} onChange={handleChange} />
    </div>
  );
};

export default ChildComponent;

