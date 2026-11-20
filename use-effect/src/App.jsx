
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [roomId, setRoomId] = useState(1);
  const [productName, setProductName] = useState("Laptop");
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showTimer, setShowTimer] = useState(true);
  const [showResize, setShowResize] = useState(true);
  const [showCounter, setShowCounter] = useState(true);

  // A. Timer cleanup
  useEffect(() => {
    if (!showTimer) return;

    const id = setInterval(() => {
      console.log("Timer tick");
    }, 1000);

    return () => {
      clearInterval(id);
      console.log("Timer stopped");
    };
  }, [showTimer]);

  // B. Resize listener cleanup
  useEffect(() => {
    if (!showResize) return;

    function handleResize() {
      console.log("Window width:", window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Resize listener removed");
    };
  }, [showResize]);

  // C. Counter with functional update
  useEffect(() => {
    if (!showCounter) return;

    const id = setInterval(() => {
      setCount(previousCount => previousCount + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [showCounter]);

  // D. Update browser tab title
  useEffect(() => {
    document.title = productName;
  }, [productName]);

  // E. Fetch user with AbortController
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      setLoading(true);
      setError("");
      setUser(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => controller.abort();
  }, [userId]);

  // F. Room connection and cleanup
  useEffect(() => {
    const options = { roomId };

    console.log("Connecting to room:", options);

    return () => {
      console.log("Disconnecting from room:", roomId);
    };
  }, [roomId]);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Week 8: Fix the Leaky Effects
      </h1>

      {/* A. Timer */}
      <section>
        <h2 className="text-xl font-bold">A. Timer</h2>
        <button onClick={() => setShowTimer(!showTimer)}>
          {showTimer ? "Hide Timer" : "Show Timer"}
        </button>
        {showTimer && <p>Timer is running. Check Console.</p>}
      </section>

      {/* B. Resize Listener */}
      <section>
        <h2 className="text-xl font-bold">B. Resize Listener</h2>
        <button onClick={() => setShowResize(!showResize)}>
          {showResize ? "Remove Listener" : "Add Listener"}
        </button>
        {showResize && <p>Resize your browser window.</p>}
      </section>

      {/* C. Counter */}
      <section>
        <h2 className="text-xl font-bold">C. Counter</h2>
        <button onClick={() => setShowCounter(!showCounter)}>
          {showCounter ? "Stop Counter" : "Start Counter"}
        </button>
        {showCounter && <p>Count: {count}</p>}
      </section>

      {/* D. Product title */}
      <section>
        <h2 className="text-xl font-bold">D. Product Title</h2>
        <p>Product: {productName}</p>
        <button onClick={() => setProductName("Smartphone")}>
          Change Product
        </button>
      </section>

      {/* E. User Details */}
      <section>
        <h2 className="text-xl font-bold">E. User Details</h2>
        <button onClick={() => setUserId(id => id === 1 ? 2 : 1)}>
          Change User
        </button>

        {loading && <p>Loading user...</p>}
        {error && <p>Error: {error}</p>}

        {user && (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
          </div>
        )}
      </section>

      {/* F. Room connection */}
      <section>
        <h2 className="text-xl font-bold">F. Room Connection</h2>
        <p>Current Room: {roomId}</p>
        <button onClick={() => setRoomId(id => id + 1)}>
          Change Room
        </button>
      </section>
    </main>
  );
}

export default App;
