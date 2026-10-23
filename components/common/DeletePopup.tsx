/** @format */

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  itemName?: string;
  onDelete: () => void;
  onCancel: () => void;
};

function DeletePopup({ isOpen, itemName, onDelete, onCancel }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open/close the native dialog when isOpen changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="delete-popup-title"
      onCancel={(e) => {
        e.preventDefault(); // Esc key: let the parent close it
        onCancel();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel(); // click on the backdrop
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md p-0 brutal-border brutal-shadow bg-background text-foreground backdrop:bg-foreground/80">
      <div className="p-8">
        <h2 id="delete-popup-title" className="text-2xl">
          DELETE {itemName ? "JOB?" : "ITEM?"}
        </h2>

        <p className="font-mono text-sm text-muted-foreground mt-3">
          {itemName ? (
            <>
              YOU ARE ABOUT TO DELETE{" "}
              <span className="font-bold text-foreground">{itemName}</span>.
            </>
          ) : (
            "ARE YOU SURE YOU WANT TO DELETE THIS ITEM?"
          )}
        </p>

        <p className="font-mono text-xs text-destructive mt-4">
          THIS ACTION CANNOT BE UNDONE.
        </p>

        <div className="flex mt-6">
          <Button variant="destructive" onClick={onDelete}>
            CONFIRM DELETE
          </Button>
          <Button
            variant="outline"
            className="border-l-0"
            onClick={onCancel}
            autoFocus>
            CANCEL
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export default DeletePopup;
