const Request = (props) => {
  const request = props.request;

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        cursor: "pointer",
      }}
    >
      Requested by: {request.requester}
      <br />
      Status: {request.status}
      <br />
      reviewer: {request.reviewer}
      <br />
      price: {request.price}
    </div>
  );
};

export default Request;
