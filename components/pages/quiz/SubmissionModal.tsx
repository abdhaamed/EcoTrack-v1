"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SubmissionModalProps {
  onClose: () => void;
}

export default function SubmissionModal({ onClose }: SubmissionModalProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/articles");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleClose = () => {
    router.push("/articles");
  };

  return (
    <div className="modal-overlay" onClick={() => {}}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-success-icon">✓</div>
        <h2 className="modal-title">Jawaban Anda Terkirim</h2>
        <p className="modal-description">
          Terima kasih telah menyelesaikan kuis. Jawaban Anda telah disimpan dan
          akan diproses.
        </p>
        <button className="modal-close-btn" onClick={handleClose}>
          Kembali ke Artikel
        </button>
      </div>
    </div>
  );
}
