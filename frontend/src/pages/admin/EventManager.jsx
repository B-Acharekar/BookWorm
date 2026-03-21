import React, { useState, useEffect } from 'react';
import { Table, Form, Modal, Spinner, Row, Col } from 'react-bootstrap';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import BrutalButton from '../../components/ui/BrutalButton';
import { FaPlus, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

const EventManager = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    link: '',
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await adminService.getManualEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminService.createEvent({
        ...newEvent,
        createdBy: user.uid
      });
      setShowModal(false);
      setNewEvent({ title: '', description: '', location: '', date: '', link: '' });
      fetchEvents();
    } catch (err) {
      alert("Failed to create event");
    }
  };

  const handleDelete = async (eid) => {
    if (window.confirm("Delete this activation?")) {
      await adminService.deleteEvent(eid);
      fetchEvents();
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="serif fw-bold mb-0">Event Activations</h3>
        <BrutalButton variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" /> Add Event
        </BrutalButton>
      </div>

      <div className="table-responsive">
        <Table hover borderless className="align-middle">
          <thead>
            <tr className="text-secondary small text-uppercase tracking-widest border-bottom">
              <th className="pb-3">Event Title</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={i} className="border-bottom">
                <td className="py-3">
                  <div className="fw-bold">{ev.title}</div>
                  <div className="small text-secondary text-truncate" style={{ maxWidth: '200px' }}>{ev.description}</div>
                </td>
                <td className="py-3 text-secondary">{ev.location}</td>
                <td className="py-3 text-secondary">{ev.date}</td>
                <td className="py-3 text-end">
                   <div className="d-flex justify-content-end gap-2">
                      <BrutalButton variant="secondary" className="p-2" onClick={() => handleDelete(ev.id)}>
                        <FaTrash className="text-danger" />
                      </BrutalButton>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* CREATE MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="rounded-3xl border-0 shadow-lg">
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="serif fw-bold">New Literary Node</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">Title</Form.Label>
              <Form.Control 
                className="bg-bg border-0 py-3" 
                required 
                value={newEvent.title}
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">Location</Form.Label>
              <Form.Control 
                className="bg-bg border-0 py-3" 
                required 
                value={newEvent.location}
                onChange={e => setNewEvent({...newEvent, location: e.target.value})}
              />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold text-secondary">Date</Form.Label>
                  <Form.Control 
                    type="date"
                    className="bg-bg border-0 py-3" 
                    required 
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold text-secondary">Link (Optional)</Form.Label>
                  <Form.Control 
                    className="bg-bg border-0 py-3" 
                    value={newEvent.link}
                    onChange={e => setNewEvent({...newEvent, link: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold text-secondary">Description</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                className="bg-bg border-0 py-3" 
                required 
                value={newEvent.description}
                onChange={e => setNewEvent({...newEvent, description: e.target.value})}
              />
            </Form.Group>
            <BrutalButton variant="primary" type="submit" className="w-100 py-3 fw-bold">
              Initialize Activation
            </BrutalButton>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventManager;
