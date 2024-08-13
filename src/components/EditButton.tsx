import { FC } from "react";

interface EditButtonProps {
	onClick: () => void;
}

const EditButton: FC<EditButtonProps> = ({ onClick }) => {
	return (
		<button onClick={onClick} aria-label="Edit">
			Edit
		</button>
	);
};

export default EditButton;
