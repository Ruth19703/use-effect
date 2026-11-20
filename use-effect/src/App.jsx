
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
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        
{/* Header */}
<header className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-800 to-indigo-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
  <div className="mb-5 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-200">
    Frontend Development Project
  </div>

  <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
    Managing React Effects
    <span className="mt-2 block text-cyan-300">
      The Right Way
    </span>
  </h1>

  <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
    A practical look at handling background tasks, browser events,
    data requests, and component updates without leaving unnecessary
    processes running.
  </p>

  <div className="mt-8 flex flex-wrap gap-3">
    <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium">
      6 Real-World Examples
    </span>

    <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium">
      React Development
    </span>

    <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium">
      Practical Learning
    </span>
  </div>
</header>


        {/* Task cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* A. Timer */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                ⏱️
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                TASK A
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Timer Cleanup
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage an interval and prevent it from continuing
              after the component is hidden.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                Timer status
              </p>
              <p className={`mt-1 font-semibold ${showTimer ? "text-green-600" : "text-red-500"}`}>
                {showTimer ? "● Running" : "● Stopped"}
              </p>
            </div>

            <button
              onClick={() => setShowTimer(!showTimer)}
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              {showTimer ? "Hide Timer" : "Show Timer"}
            </button>

            {showTimer && (
              <p className="mt-3 text-center text-xs text-slate-400">
                Timer is running. Check Console.
              </p>
            )}
          </section>

          {/* B. Resize Listener */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                ↔️
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                TASK B
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Resize Listener
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Register and remove browser resize events using
              the same function reference.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                Listener status
              </p>
              <p className={`mt-1 font-semibold ${showResize ? "text-green-600" : "text-red-500"}`}>
                {showResize ? "● Active" : "● Removed"}
              </p>
            </div>

            <button
              onClick={() => setShowResize(!showResize)}
              className="mt-5 w-full rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 active:scale-95"
            >
              {showResize ? "Remove Listener" : "Add Listener"}
            </button>

            {showResize && (
              <p className="mt-3 text-center text-xs text-slate-400">
                Resize your browser window.
              </p>
            )}
          </section>

          {/* C. Counter */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-xl">
                🔢
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                TASK C
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Counter & Stale Closure
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Use functional state updates to prevent the
              counter from getting stuck at 1.
            </p>

            <div className="mt-5 rounded-xl bg-green-50 p-5 text-center">
              <p className="text-sm font-medium text-green-700">
                Current Count
              </p>
              <p className="mt-2 text-5xl font-extrabold tabular-nums text-green-700">
                {count}
              </p>
              <p className="mt-2 text-xs text-green-600">
                {showCounter ? "Counter is increasing" : "Counter is paused"}
              </p>
            </div>

            <button
              onClick={() => setShowCounter(!showCounter)}
              className="mt-5 w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 active:scale-95"
            >
              {showCounter ? "Stop Counter" : "Start Counter"}
            </button>
          </section>

          {/* D. Product Title */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                🛍️
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                TASK D
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Dynamic Product Title
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Update the browser tab title whenever the
              product name changes.
            </p>

            <div className="mt-5 rounded-xl bg-orange-50 p-5">
              <p className="text-sm text-orange-700">
                Current Product
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-800">
                {productName}
              </p>
            </div>

            <button
              onClick={() => setProductName("Smartphone")}
              className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-95"
            >
              Change Product
            </button>
          </section>

          {/* E. User Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-xl">
                👤
              </span>
              <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
                TASK E
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              User Details API
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Fetch user information and cancel previous
              requests using AbortController.
            </p>

            <div className="mt-5 min-h-32 rounded-xl bg-cyan-50 p-4">
              {loading && (
                <p className="font-medium text-cyan-700">
                  Loading user details...
                </p>
              )}

              {error && (
                <p className="text-sm text-red-600">
                  Error: {error}
                </p>
              )}

              {user && (
                <div className="space-y-2 text-sm text-slate-700">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
                </div>
              )}

              {!loading && !error && !user && (
                <p className="text-sm text-slate-500">
                  Waiting for user information...
                </p>
              )}
            </div>

            <button
              onClick={() => setUserId(id => id === 1 ? 2 : 1)}
              className="mt-5 w-full rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 active:scale-95"
            >
              Switch to User {userId === 1 ? 2 : 1}
            </button>
          </section>

          {/* F. Room Connection */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                🏠
              </span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                TASK F
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Room Connection
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage effect dependencies and understand
              cleanup when roomId changes.
            </p>

            <div className="mt-5 rounded-xl bg-indigo-50 p-5">
              <p className="text-sm text-indigo-700">
                Current Room
              </p>
              <p className="mt-2 text-4xl font-extrabold text-indigo-700">
                {roomId}
              </p>
            </div>

            <button
              onClick={() => setRoomId(id => id + 1)}
              className="mt-5 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
            >
              Change Room
            </button>
          </section>

        </div>

       
{/* Footer */}
<footer className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 px-6 py-8 text-white shadow-lg">
  <div className="text-center">
    <h2 className="text-2xl font-extrabold tracking-wide">
      Keep Learning. Keep Building.
    </h2>

    <p className="mt-3 text-sm text-indigo-100">
      Understanding React one effect at a time.
    </p>

    <div className="mx-auto my-5 h-1 w-16 rounded-full bg-white/70"></div>

    <p className="text-sm font-medium">
      React Hooks & Component Lifecycle
    </p>

    <p className="mt-2 text-xs text-indigo-200">
      Advanced Frontend Web Development
    </p>

    <p className="mt-5 text-xs text-indigo-200">
      Built with React & Tailwind CSS · 2026
    </p>
  </div>
</footer>


      </div>
    </main>
  );
}

export default App;
