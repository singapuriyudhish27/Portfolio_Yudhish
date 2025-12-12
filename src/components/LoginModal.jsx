"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function LoginModal({ open, onClose, onSuccess, title = "Login Required" }) {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginUser(form.email, form.password);
    
    if (result.success) {
      setForm({ email: "", password: "" });
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
    
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="badge">Authentication</div>
            <h3>{title}</h3>
            <p className="subtle">Please login to access this feature.</p>
          </div>
          <button className="pill-ghost" type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Email</span>
              <input
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                type="email"
                required
                autoFocus
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                value={form.password}
                onChange={update("password")}
                placeholder="••••••••"
                type="password"
                required
              />
            </label>
          </div>

          {error ? (
            <div className="notice notice-error">{error}</div>
          ) : null}

          <div className="modal-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>

          <p className="subtle" style={{ marginTop: 12, fontSize: "0.875rem" }}>
            Don&apos;t have an account? Use any email and password to create one.
          </p>
        </form>
      </div>
    </div>
  );
}
