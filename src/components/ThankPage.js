import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ThankPage = ({ handleClose, show }) => {
  function refreshPage() {
    handleClose();
    window.location.reload(false);
  }
  return (
    <Modal
      show={show}
      onHide={refreshPage}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Votre rendez-vous a bien été confirmé</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={refreshPage}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ThankPage;
