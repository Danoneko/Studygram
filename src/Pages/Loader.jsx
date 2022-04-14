const Loader = (props) => {
  return (
    <div className="container loader-container">
      <svg class="loader" viewBox="0 0 24 24">
        <circle class="loader__value" cx="12" cy="12" r="10" />
        <circle class="loader__value" cx="12" cy="12" r="10" />
        <circle class="loader__value" cx="12" cy="12" r="10" />
        <circle class="loader__value" cx="12" cy="12" r="10" />
        <circle class="loader__value" cx="12" cy="12" r="10" />
        <circle class="loader__value" cx="12" cy="12" r="10" />
      </svg>
      <h2 className="color-grey-300">{props.name}</h2>
    </div>
  );
};

export { Loader };
