import { useState } from "react";
import "./App.css";

const MEMBERS = [
  { id: 1, name: "Priya Shah", role: "Frontend Engineer", status: "active", avatar: "/avatars/priya.png" },
  { id: 2, name: "Marcus Ortiz", role: "Backend Engineer", status: "active", avatar: "/avatars/marcus.png" },
  { id: 3, name: "Lena Kowalski", role: "Product Designer", status: "pending", avatar: "/avatars/lena.png" },
  { id: 4, name: "Diego Fernandez", role: "QA Engineer", status: "pending", avatar: "/avatars/diego.png" },
  { id: 5, name: "Aiko Tanaka", role: "Engineering Manager", status: "active", avatar: "/avatars/aiko.png" },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [inviteOpen, setInviteOpen] = useState(false);

  // BUG: filtering does work correctly...
  const visibleMembers =
    activeTab === "all" ? MEMBERS : MEMBERS.filter((m) => m.status === activeTab);

  return (
    <div className="page">
      <header className="topbar">
        <h1>Team</h1>

        <div className="invite-wrap">
          <button className="btn-primary" onClick={() => setInviteOpen((o) => !o)}>
            + Invite member
          </button>

          {inviteOpen && (
            <div className="invite-panel">
              <label htmlFor="invite-email">Email address</label>
              <input id="invite-email" type="email" placeholder="teammate@company.com" />
              <button className="btn-primary btn-small">Send invite</button>
            </div>
          )}
        </div>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            // BUG: this always compares against the literal string "all"
            // instead of `activeTab`, so the highlighted/active tab never
            // moves no matter which tab is actually selected, even though
            // clicking correctly filters the list below.
            className={"tab" + (tab.key === "all" ? " tab-active" : "")}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="member-grid">
        {visibleMembers.map((m) => (
          <article className="member-card" key={m.id}>
            {/* BUG: avatar paths point to /avatars/*.png which don't exist
                in /public, so every card renders a broken-image icon
                instead of a photo. */}
            <img className="avatar" src={m.avatar} alt={m.name} />
            <div className="member-info">
              <h2>{m.name}</h2>
              <p>{m.role}</p>
              <span className={"status-pill status-" + m.status}>{m.status}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
