const DrawCountries = (props) => {
  return props.current ? (
    props.current === props.name ? (
      <option value={props.name} selected>
        {props.name}
      </option>
    ) : (
      <option value={props.name}>{props.name}</option>
    )
  ) : (
    <option value={props.name}>{props.name}</option>
  );
};

export { DrawCountries };
