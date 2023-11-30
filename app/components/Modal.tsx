"use client";
import React, { useRef, useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = ({ showModal, setShowModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialYRef = useRef<number>(0);
  const lastYRef = useRef<number>(0);
  const isDownRef = useRef<boolean>(false);

  const handleTouch = (e: TouchEvent) => {
    // e.preventDefault();

    if (modalRef.current) {
      const firstTouch = e.touches[0];
      const currentY = firstTouch.clientY - initialYRef.current;

      if (currentY > 0) {
        modalRef.current.style.transform = `translateY(${currentY}px)`;
      }

      if (lastYRef.current > firstTouch.clientY) {
        isDownRef.current = false;
      }

      if (lastYRef.current < firstTouch.clientY && currentY > 100) {
        isDownRef.current = true;
      }

      lastYRef.current = firstTouch.clientY;
    }
  };

  const touchStart = (e: TouchEvent) => {
    if (modalRef.current) {
      const firstTouch = e.touches[0];
      initialYRef.current = firstTouch.clientY;
      modalRef.current.style.transition = "0s";
      document.addEventListener("touchmove", handleTouch);
    }
  };

  const resetModal = () => {
    if (modalRef.current) {
      if (isDownRef.current) {
        modalRef.current.style.transform = "translateY(100%)";
        document.removeEventListener("touchmove", handleTouch);
        modalRef.current.style.transition = "0.4s";
        setTimeout(() => {
          document.body.style.overflow = "visible";
          if (modalRef.current) {
            // modalRef.current.style.display = "none";
            setShowModal(false);
          }
        }, 300);
      } else {
        modalRef.current.style.transform = "translateY(0px)";
        document.removeEventListener("touchmove", handleTouch);
        modalRef.current.style.transition = "0.4s";
      }

      isDownRef.current = false;
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      const modalElement = modalRef.current;
      document.body.style.overflow = "clip";
      modalElement.addEventListener("touchstart", touchStart);
      modalElement.addEventListener("touchend", resetModal);
      modalElement.addEventListener("touchcancel", resetModal);

      return () => {
        modalElement.removeEventListener("touchstart", touchStart);
        modalElement.removeEventListener("touchend", resetModal);
        modalElement.removeEventListener("touchcancel", resetModal);
      };
    }
  }, []);

  return (
    <div ref={modalRef} className="w-full h-screen fixed top-0 left-0 z-50 ">
      {children}
    </div>
  );
};

export default Modal;
