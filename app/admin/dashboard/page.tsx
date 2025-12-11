"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Enquiry {
  _id: string;
  childName: string;
  grade: string;
  boardingType: string;
  email: string;
  mobile: string;
  message: string;
  submittedAt: string;
}

interface Admission {
  _id: string;
  firstName: string;
  lastName: string;
  grade: string;
  board: string;
  fatherEmail: string;
  motherEmail: string;
  status: string;
  applicationNumber?: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"enquiries" | "admissions">("enquiries");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth-token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [enquiriesRes, admissionsRes] = await Promise.all([
        fetch("/api/admin/enquiries", { headers }),
        fetch("/api/admin/admissions", { headers }),
      ]);

      if (enquiriesRes.status === 401 || admissionsRes.status === 401) {
        localStorage.removeItem("auth-token");
        router.push("/admin/login");
        return;
      }

      const enquiriesData = await enquiriesRes.json();
      const admissionsData = await admissionsRes.json();

      setEnquiries(enquiriesData.enquiries || []);
      setAdmissions(admissionsData.admissions || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, type: "enquiry" | "admission") => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const token = localStorage.getItem("auth-token");
      const endpoint = type === "enquiry" ? `/api/admin/enquiries/${id}` : `/api/admin/admissions/${id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        if (type === "enquiry") {
          setEnquiries((prev) => prev.filter((e) => e._id !== id));
        } else {
          setAdmissions((prev) => prev.filter((a) => a._id !== id));
        }
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete");
    }
  };

  const handleExport = async (type: "enquiries" | "admissions") => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/admin/export?type=${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${type}-${new Date().toISOString().split("T")[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Failed to export");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push("/admin/login");
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.mobile.includes(searchTerm)
  );

  const filteredAdmissions = admissions.filter(
    (a) =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.fatherEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.motherEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.applicationNumber && a.applicationNumber.includes(searchTerm))
  );

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "18px", color: "#666" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1C2C5B 0%, #2C3E6B 100%)",
        color: "white",
        padding: "20px 40px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>Admin Dashboard</h1>
            <p style={{ margin: "5px 0 0", opacity: 0.9, fontSize: "14px" }}>Doon International School</p>
          </div>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "30px auto", padding: "0 20px" }}>
        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}>
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>Total Enquiries</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#1C2C5B" }}>{enquiries.length}</div>
          </div>
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>Total Admissions</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#1C2C5B" }}>{admissions.length}</div>
          </div>
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>Pending Review</div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#E5B93C" }}>
              {admissions.filter((a) => a.status === "submitted" || a.status === "under-review").length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", borderBottom: "2px solid #f0f0f0" }}>
            <button
              onClick={() => setActiveTab("enquiries")}
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                background: activeTab === "enquiries" ? "#1C2C5B" : "transparent",
                color: activeTab === "enquiries" ? "white" : "#666",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s",
              }}
            >
              Enquiries ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("admissions")}
              style={{
                flex: 1,
                padding: "16px",
                border: "none",
                background: activeTab === "admissions" ? "#1C2C5B" : "transparent",
                color: activeTab === "admissions" ? "white" : "#666",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s",
              }}
            >
              Admissions ({admissions.length})
            </button>
          </div>

          {/* Search and Export */}
          <div style={{ padding: "20px", display: "flex", gap: "15px", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            <button
              onClick={() => handleExport(activeTab)}
              style={{
                padding: "12px 24px",
                background: "#E5B93C",
                color: "#1C2C5B",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Export to Excel
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            {activeTab === "enquiries" ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Grade</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Boarding</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Email</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Mobile</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Date</th>
                    <th style={{ padding: "12px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#666" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} style={{ borderTop: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{enquiry.childName}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{enquiry.grade}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{enquiry.boardingType}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{enquiry.email}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{enquiry.mobile}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        {new Date(enquiry.submittedAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => handleDelete(enquiry._id, "enquiry")}
                          style={{
                            padding: "6px 12px",
                            background: "#fee",
                            color: "#c33",
                            border: "1px solid #fcc",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>App No.</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Student Name</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Grade</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Board</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Father Email</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#666" }}>Date</th>
                    <th style={{ padding: "12px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#666" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmissions.map((admission) => (
                    <tr key={admission._id} style={{ borderTop: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px", fontSize: "14px", fontFamily: "monospace" }}>
                        {admission.applicationNumber || "N/A"}
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        {admission.firstName} {admission.lastName}
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{admission.grade}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{admission.board}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>{admission.fatherEmail}</td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                          background:
                            admission.status === "accepted"
                              ? "#d4edda"
                              : admission.status === "rejected"
                              ? "#f8d7da"
                              : admission.status === "under-review"
                              ? "#fff3cd"
                              : "#e2e3e5",
                          color:
                            admission.status === "accepted"
                              ? "#155724"
                              : admission.status === "rejected"
                              ? "#721c24"
                              : admission.status === "under-review"
                              ? "#856404"
                              : "#383d41",
                        }}>
                          {admission.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        {new Date(admission.submittedAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => handleDelete(admission._id, "admission")}
                          style={{
                            padding: "6px 12px",
                            background: "#fee",
                            color: "#c33",
                            border: "1px solid #fcc",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {activeTab === "enquiries" && filteredEnquiries.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              {searchTerm ? "No enquiries found matching your search" : "No enquiries yet"}
            </div>
          )}

          {activeTab === "admissions" && filteredAdmissions.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
              {searchTerm ? "No admissions found matching your search" : "No admissions yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

