import { useEffect, useState } from "react";
import { getRequests, submitRequest } from "../services/requests";

function HomePage() {
  const [note, setNote] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [listMessage, setListMessage] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [requests, setRequests] = useState([]);
  const regexAnyDigit = /\d/;
  const regexHasLetter = /[a-zA-Z]/;

  useEffect(() => {
    refreshRequests(); // Now works
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitMessage(null);  
    
    try {
        await submitRequest(user, note);
        setSubmitMessage("✅ Request submitted!");
        setNote("");
      } catch (err) {
        setSubmitMessage("❌Submit failed. " + err.message);
      }
      
      setLoading(false);
  };

  const submitButtonOnClick = async () => {
    if(!isTheSubmittedInputValid) {
      return;
    }

    await handleSubmit();
    refreshRequests();
  };

  const isTheSubmittedInputValid = () => {
    if (!note.trim()) {
      setSubmitMessage("❌ Shopping list is required");
      return false;
    }

    if (!user.trim()) {
      setSubmitMessage("❌ Name is required");
      return false;
    }

    if (regexAnyDigit.test(user)) {
      setSubmitMessage("❌ Name cannot contain numbers");
      return false;
    }

    if (!regexHasLetter.test(note)) {
      setSubmitMessage("❌ Note must include at least one letter.");
      return false;
    }

    return true;
  };

  const refreshRequests = async () => {
    setListMessage(null);

    try {
      const updated = await getRequests();
      setRequests(updated);
    } catch(err) {
      setListMessage("❌Past Requests display failed. " + err.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Weekly Shopping Request</h1>

      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter your name"
      />

      <br />
      <br />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        cols={40}
        placeholder="Enter your shopping note here..."
      />

      <br />
      <button onClick={submitButtonOnClick} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {submitMessage && <p>{submitMessage}</p>}

      <h2>Past Requests</h2>
      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            <strong>{r.user_name}</strong> ({new Date(r.timestamp).toLocaleString()}):{" "}
            {r.note}
          </li>
        ))}
      </ul>
      
      {listMessage && <p>{listMessage}</p>}

    </div>
  );
}


export default HomePage;