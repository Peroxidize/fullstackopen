const Filter = ({ newFilter, handleFilterInputChange }) => {
  return (
    <>
      <div>filter shown with <input value={newFilter} onChange={handleFilterInputChange} /></div>
    </>
  );
}

export default Filter;
