const FormRow = ({
  type = "text",
  name,
  labelText,
  defaultValue,
  onChange,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className="input font-semibold"
        required
        {...rest}
      />
    </div>
  );
};
export default FormRow;
