const CustomModal = ({ title = "Hata", message = "", onCancel = () => {}, onConfirm = () => {} }) => {
  return (
    /* genel kapsayıcı */
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      {/* modalın kapsayıcısı */}
      <div
        style={{
          width: "70%",
          maxWidth: "500px", // Ekranın daha dar olduğu durumda modalı sınırlamak için
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center">{message}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomModal