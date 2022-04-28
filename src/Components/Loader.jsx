const Loader = () => {
  return (
    <div className="container loader-container">
      <svg className="loader" viewBox="0 0 24 24">
        <circle className="loader__value" cx="12" cy="12" r="10" />
        <circle className="loader__value" cx="12" cy="12" r="10" />
        <circle className="loader__value" cx="12" cy="12" r="10" />
        <circle className="loader__value" cx="12" cy="12" r="10" />
        <circle className="loader__value" cx="12" cy="12" r="10" />
        <circle className="loader__value" cx="12" cy="12" r="10" />
      </svg>
      
      <h2 className="color-grey-300">Welcome to Studygram</h2>
    </div>
  );
};

export { Loader };
