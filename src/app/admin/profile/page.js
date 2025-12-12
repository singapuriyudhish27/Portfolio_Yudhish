"use client";

import { useAuth } from "@/contexts/AuthContext";
import { TopNav } from "@/components/TopNav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminPanelPage() {
  const { admin, logoutAdmin, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="page">
        <div className="content">
          <TopNav />
          <section className="section">
            <div className="glass" style={{ padding: 18 }}>
              <p className="subtle">Loading...</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="page">
      <div className="content">
        <TopNav />

        <section className="section">
          <div className="section-header">
            <h2>Admin Panel</h2>
            <span className="pill">Administrator</span>
          </div>

          <div className="glass" style={{ padding: 24, marginTop: 16 }}>
            <div style={{ marginBottom: 20 }}>
              <div className="badge">Admin Account</div>
              <h3 style={{ marginTop: 10, marginBottom: 6 }}>Administrator Dashboard</h3>
              <p className="subtle">
                Email: <strong>{admin?.email}</strong>
              </p>
              <p className="subtle" style={{ marginTop: 8 }}>
                Role: <strong>{admin?.role || "Admin"}</strong>
              </p>
            </div>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 style={{ marginBottom: 12 }}>Admin Actions</h3>
              <div className="cta-row" style={{ flexWrap: "wrap", gap: 12 }}>
                <Link className="btn btn-primary" href="/projects/new">
                  Add New Project
                </Link>
                <Link className="btn btn-ghost" href="/projects">
                  Manage Projects
                </Link>
              </div>
            </div>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  logoutAdmin();
                  router.push("/");
                }}
                style={{ color: "var(--error, #ff4444)" }}
              >
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
