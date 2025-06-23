'use client';

type ModalAdminProps = {
  modalId: string;
  reservationId: number;
  etat: string; // valeur actuelle de l'état (0, 1 ou 2)
  onEtatChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ModalAdmin({
  modalId,
  reservationId,
  etat,
  onEtatChange,
  onSubmit,
}: ModalAdminProps) {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary mt-2"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        Choix d'état
      </button>

      <div
        className="modal fade"
        id={modalId}
        tabIndex={-1}
        aria-labelledby={`${modalId}-label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={onSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}-label`}>
                  Choisissez un état pour la réservation {reservationId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>État actuel : {etat === '0' ? 'Non défini' : `Option ${etat}`}</p>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`etat-${reservationId}`}
                    value="1"
                    id={`etat1-${reservationId}`}
                    checked={etat === '1'}
                    onChange={(e) => onEtatChange(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`etat1-${reservationId}`}>
                    Option 1
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`etat-${reservationId}`}
                    value="2"
                    id={`etat2-${reservationId}`}
                    checked={etat === '2'}
                    onChange={(e) => onEtatChange(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`etat2-${reservationId}`}>
                    Option 2
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
