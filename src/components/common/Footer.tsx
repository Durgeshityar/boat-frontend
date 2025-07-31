export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#16202366',
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(44px)',
        fontWeight: 400,
      }}
      className="relative z-20 px-8 text-white text-lg"
    >
      <span
      className="text-sm font-normal"
      >
        Valour by boat
      </span>
      <span
      className="text-sm font-normal"
      >
        All rights reserved.
      </span>
    </footer>
  );
}
