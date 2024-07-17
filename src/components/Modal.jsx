/**
 * Modal Component
 * 
 * Renders a modal dialog that can display custom content.
 * 
 * Usage:
 * 
 * <Modal
 *   showModal={showModal}     // Required: Boolean to control modal visibility
 *   handleClose={handleClose} // Required: Function to close the modal
 *   content={modalContent}    // Required: JSX content to display inside the modal
 *   width="w-72"              // Optional: Tailwind CSS class for modal width. Default is 'w-full'
 * />
 * 
 * Props:
 * - `showModal` (boolean): **Required** - Controls the visibility of the modal.
 * - `handleClose` (function): **Required** - Function to close the modal when the close button is clicked.
 * - `content` (JSX): **Required** - JSX content to be displayed inside the modal.
 * - `width` (string): Optional - Tailwind CSS class for the width of the modal. Default is 'w-full'.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { IoCloseSharp } from 'react-icons/io5';
const Modal = ({ showModal, handleClose, content, width }) => {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className={`bg-slate-900 rounded-lg shadow-lg relative ${width}`}
                    >
                        <IoCloseSharp
                            className="text-gray-600 hover:text-black cursor-pointer absolute top-2 right-2 text-2xl font-bold"
                            onClick={handleClose}
                        />
                        {content}
                    </div>
                </div>
            )}
        </>
    );
};
Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
    width: PropTypes.string,
};
export default Modal;
