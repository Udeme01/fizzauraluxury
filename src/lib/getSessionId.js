// src/lib/getSessionId.js
export const getSessionId = () => {
  let sessionId = sessionStorage.getItem("fa_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("fa_session_id", sessionId);
  }

  return sessionId;
};
