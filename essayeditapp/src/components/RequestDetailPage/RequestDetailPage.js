const EssayPlaceholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget mauris et bibendum. Nullam ut mollis nunc, sit amet interdum mi. Donec faucibus magna vel ipsum volutpat dapibus eleifend interdum diam. Praesent posuere erat elit, vitae congue diam tempor at. Aliquam dictum, dolor vel placerat ultrices, ex neque tempus odio, vel egestas orci nunc eu ex. Curabitur eget blandit lectus. Maecenas at leo congue, bibendum leo sed, aliquet velit. Duis finibus quis risus quis aliquam. Etiam a nisi ut nibh tempus facilisis vitae non metus. Praesent ultricies nisi eu sagittis consequat. Phasellus et tortor ut augue viverra mattis sed vitae mi. Donec lobortis nunc eu purus sodales posuere. Quisque scelerisque ante arcu, sed auctor odio aliquam nec. Nam pretium quam ex. Fusce vitae bibendum metus, in maximus sem. Phasellus et lacus sed mauris semper malesuada non in ex.";

const SampleRequest = {
  requester: "Kailas_Moon2000",
  essayContent: EssayPlaceholder,
  status: "COMPLETED",
  reviewer: "ethanmoran",
  reviewRating: 4.3,
  price: 8,
};

const RequestDetailPage = (props) => {
  console.log(props);
  const request = SampleRequest;

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
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
      <br />
      {request.essayContent}
      <br />
      <button onClick={() => window.open("/yourRequests", "_self")}>
        Back
      </button>
    </div>
  );
};

export default RequestDetailPage;
