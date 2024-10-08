import { FC } from "react";

interface DeleteButtonProps {
	onClick: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="delete-button"
			aria-label="Delete"
			style={{ backgroundColor: "#ff4c4c" }}
		>
			Delete
		</button>
	);
};

export default DeleteButton;
