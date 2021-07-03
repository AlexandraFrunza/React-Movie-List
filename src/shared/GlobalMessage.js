import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';

const GlobalMessageContext = React.createContext();

export function GlobalMessageContextProvider({ children }) {
  const initialContent = {
    message: '',
    title: '',
    type: 'error',
  };
  const [show, setShow] = useState('hide');
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setShow((content.message && 'show') || 'hide');
  }, [content.message]);

  const styles = {
    error: {
      bg: 'bg-danger',
      text: 'text-white',
    },
    success: {
      bg: 'bg-success',
      text: 'text-white',
    },
  };

  function hideToast() {
    setShow('hide');
    setContent(initialContent);
  }

  function createMessage(type, title, message) {
    setContent({ type, title, message });
  }

  return (
    <GlobalMessageContext.Provider value={createMessage}>
      {children}
      <div
        className={`toast-container position-fixed top-0 end-0 p-3 fade ${show}`}
      >
        <div
          className={`toast fade ${styles[content.type].bg} ${
            styles[content.type].text
          } ${show}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">{content.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={hideToast}
            ></button>
          </div>
          <div className="toast-body">{content.message}</div>
        </div>
      </div>
    </GlobalMessageContext.Provider>
  );
}

export function useGlobalMessage() {
  return useContext(GlobalMessageContext);
}
