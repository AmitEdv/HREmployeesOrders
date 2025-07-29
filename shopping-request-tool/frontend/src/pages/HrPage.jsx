import { useState } from "react";
import { deleteAllRequests } from "../services/requests";

function HrPage() {
    const [deleting, setDeleting] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

   const deleteAllReqButtonOnClick = async () => {
      await handleDeleteAllReq();
    };
  
  const handleDeleteAllReq = async () => {
      setDeleting(true);
      setDeleteMessage(null);
      
      try {
          await deleteAllRequests();
          setDeleteMessage("✅ Requests deleted!");
        } catch (err) {
          setDeleteMessage("❌Deletion failed. " + err.message);
        }
        
        setDeleting(false);
    };
  
    return (
    <div style={{ padding: 20 }}>
      <h1>HR Dashboard (Private)</h1>
      <p>This is a private page for HR use only.</p>

      <br />
      <button onClick={deleteAllReqButtonOnClick} disabled={deleting}>
        {deleting ? "Deleting..." : "Delete All Requests"}
      </button>

      {deleteMessage && <p>{deleteMessage}</p>}

    </div>
  );
}

export default HrPage;