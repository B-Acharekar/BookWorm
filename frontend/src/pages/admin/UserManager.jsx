import React, { useState, useEffect } from 'react';
import { Table, Badge, Spinner, Form } from 'react-bootstrap';
import { adminService } from '../../services/api';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaUserShield, FaUserEdit, FaTrash } from 'react-icons/fa';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(True);
    try {
      const res = await adminService.getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (uid, email, newRole) => {
    try {
      await adminService.updateRole(uid, { email, role: newRole });
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" className="text-accent" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="serif fw-bold mb-4">User Archive</h3>
      <div className="table-responsive">
        <Table hover borderless className="align-middle">
          <thead>
            <tr className="text-secondary small text-uppercase tracking-widest border-bottom">
              <th className="pb-3">User</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.uid} className="border-bottom">
                <td className="py-3 fw-bold">{u.displayName || "Anonymous Researcher"}</td>
                <td className="py-3 text-secondary">{u.email}</td>
                <td className="py-3">
                  <Badge bg={u.role === 'admin' ? 'accent' : 'secondary'} className="rounded-full px-3 py-2 text-uppercase letter-spacing-wide">
                    {u.role || 'user'}
                  </Badge>
                </td>
                <td className="py-3 text-end">
                   <div className="d-flex justify-content-end gap-2">
                      <BrutalButton 
                        variant="secondary" 
                        className="py-1 px-3 small"
                        onClick={() => handleRoleChange(u.uid, u.email, u.role === 'admin' ? 'user' : 'admin')}
                      >
                        {u.role === 'admin' ? 'Demote' : 'Make Admin'}
                      </BrutalButton>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserManager;
