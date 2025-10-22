import { Modal, ModalProps } from "react-bootstrap";

export const ModalComponent = ({ children, title, ...props }: ModalProps) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {/* <Button variant="danger" onClick={props.onHide}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};
