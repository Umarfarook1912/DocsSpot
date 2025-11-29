import React, { useEffect, useState } from "react";
import { Table, Button, Alert, Spinner, Badge } from "react-bootstrap";
import { fetchDoctorsAdminApi, approveDoctorApi, rejectDoctorApi } from "../api/doctorApi.js";

const DoctorManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState("");

    const loadDoctors = async () => {
        setLoading(true);
        try {
            const res = await fetchDoctorsAdminApi();
            // axios returns data in res.data
            const docs = res?.data ?? res;
            setDoctors(docs);
        } catch (err) {
            console.error("Failed to load doctors", err);
            setError(err.response?.data?.message || err.message || "Failed to load doctors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    const handleApprove = async (id) => {
        setActionLoading(id);
        try {
            await approveDoctorApi(id);
            await loadDoctors();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to approve doctor");
        } finally {
            setActionLoading("");
        }
    };

    const handleReject = async (id) => {
        setActionLoading(id);
        try {
            await rejectDoctorApi(id);
            await loadDoctors();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reject doctor");
        } finally {
            setActionLoading("");
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h4>Doctor Management</h4>

            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(doctors) && doctors.length > 0 ? (
                        doctors.map((doc) => (
                            <tr key={doc._id}>
                                <td>{doc.user?.name}</td>
                                <td>{doc.user?.email}</td>
                                <td>{doc.user?.designation}</td>
                                <td>
                                    {doc.isApproved ? (
                                        <Badge bg="success">Approved</Badge>
                                    ) : (
                                        <Badge bg="warning">Pending</Badge>
                                    )}
                                </td>
                                <td>
                                    {!doc.isApproved ? (
                                        <>
                                            <Button size="sm" variant="success" className="me-2" onClick={() => handleApprove(doc._id)} disabled={actionLoading === doc._id}>
                                                {actionLoading === doc._id ? "Processing..." : "Approve"}
                                            </Button>
                                            <Button size="sm" variant="danger" onClick={() => handleReject(doc._id)} disabled={actionLoading === doc._id}>
                                                {actionLoading === doc._id ? "Processing..." : "Reject"}
                                            </Button>
                                        </>
                                    ) : (
                                        <small>No actions</small>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center text-muted">No doctors found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default DoctorManagement;
