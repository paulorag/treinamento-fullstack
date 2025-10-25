"use client";
import ReactModal from "react-modal";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    contentLabel: string;
}

if (typeof window !== "undefined") {
    ReactModal.setAppElement("body");
}

export function Modal({
    isOpen,
    onRequestClose,
    children,
    contentLabel,
}: ModalProps) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    zIndex: 1000,
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    background: "#2D3748",
                    padding: "2rem",
                    borderRadius: "8px",
                    border: "none",
                    color: "white",
                    maxWidth: "500px",
                    width: "90%",
                },
            }}
        >
            {children}
        </ReactModal>
    );
}
