export const getCursor = ({ isHovering, isDragging }) => {
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
};
