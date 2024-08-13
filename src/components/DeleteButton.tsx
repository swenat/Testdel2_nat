import { FC } from "react";

interface DeleteButtonProps {
	onClick: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
	return (
		<button onClick={onClick} aria-label="Delete">
			Delete
		</button>
	);
};

export default DeleteButton;
