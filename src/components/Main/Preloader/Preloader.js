import './Preloader.css';

export default function Preloader({ isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="preloader">
          <div className="preloader__form">
            <span className="preloader__spinner"></span>
          </div>
        </div>
      )}
    </>
  );
}