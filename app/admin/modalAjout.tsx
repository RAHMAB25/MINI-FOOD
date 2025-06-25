'use client';

import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

type User = {
  non: string;
  adre: string;
  tep: string;
  mail: string;
  motpas: string;   
};

export default function ModalAjout({
  show,
  handleClose,
  onUserAdded,
}: {
  show: boolean;
  handleClose: () => void;
  onUserAdded?: () => void;
}) {
  const [user, setUser] = useState<User>({
    non: '',
    adre: '',
    tep: '',
    mail: '',
    motpas: '',   
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!user.non || !user.mail || !user.motpas) {
      setError('Veuillez remplir au moins le nom, l\'email et le mot de passe.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3002/adduser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        setMessage('Utilisateur ajouté avec succès !');
        setUser({ non: '', adre: '', tep: '', mail: '', motpas: '' });
        if (onUserAdded) onUserAdded();
      } else {
        setError('Erreur lors de l\'ajout.');
      }
    } catch (error) {
      setError('Erreur réseau ou serveur.');
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un utilisateur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="non">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="non"
              value={user.non}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="adre">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              name="adre"
              value={user.adre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tep">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="tel"
              name="tep"
              value={user.tep}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="mail"
              value={user.mail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="motpas">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="motpas"
              value={user.motpas}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
